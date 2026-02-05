import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { formatCurrency, formatDate } from '../../utils/helpers';

const STATUS_BADGE = {
  open: 'badge--success',
  claimed: 'badge--primary',
  in_progress: 'badge--warning',
  completed: 'badge--secondary',
  cancelled: 'badge--danger',
};

export default function RequestDetailPage() {
  const { id } = useParams();
  const {
    getItemById, getOffers, getBuildParts, getUser,
    createItem, editItem, acceptOffer, getBuilderProfile,
  } = useData();
  const { user, isAuthenticated, isBuilder } = useAuth();

  const [request, setRequest] = useState(null);
  const [build, setBuild] = useState(null);
  const [parts, setParts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [poster, setPoster] = useState(null);

  // Offer form state
  const [offerFee, setOfferFee] = useState(0);
  const [offerMessage, setOfferMessage] = useState('');
  const [offerContact, setOfferContact] = useState('');
  const [offerError, setOfferError] = useState('');

  const loadData = () => {
    const req = getItemById('build_requests', id);
    if (!req) return;
    setRequest(req);
    setBuild(getItemById('builds', req.build_id));
    setParts(getBuildParts(req.build_id));
    setOffers(getOffers({ request_id: req.id }));
    setPoster(getUser(req.user_id));
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!request) {
    return (
      <div className="page">
        <div className="empty-state">
          <p>Request not found.</p>
          <Link to="/requests" className="btn btn--primary">Back to Request Board</Link>
        </div>
      </div>
    );
  }

  const isOwner = isAuthenticated && user.id === request.user_id;
  const alreadyOffered = isBuilder && offers.some(o => o.builder_id === user?.id);

  const handleSubmitOffer = (e) => {
    e.preventDefault();
    setOfferError('');

    if (!offerMessage.trim()) {
      setOfferError('Please provide a message.');
      return;
    }
    if (!offerContact.trim()) {
      setOfferError('Please provide your contact information.');
      return;
    }
    if (alreadyOffered) {
      setOfferError('You have already submitted an offer for this request.');
      return;
    }

    createItem('builder_offers', {
      request_id: request.id,
      builder_id: user.id,
      fee: Number(offerFee) || 0,
      message: offerMessage.trim(),
      contact_info: offerContact.trim(),
      status: 'pending',
    });

    setOfferFee(0);
    setOfferMessage('');
    setOfferContact('');
    loadData();
  };

  const handleAcceptOffer = (offerId) => {
    acceptOffer(offerId, request.id);
    loadData();
  };

  const handleMarkComplete = () => {
    editItem('build_requests', request.id, { status: 'completed' });
    loadData();
  };

  const handleCancel = () => {
    editItem('build_requests', request.id, { status: 'cancelled' });
    loadData();
  };

  return (
    <div className="page">
      <Link to="/requests" className="btn btn--ghost" style={{ marginBottom: '1rem' }}>
        &larr; Back to Request Board
      </Link>

      {/* Request Info Card */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card__header">
          <h1 className="card__title">
            {build ? (
              <Link to={`/builds/${build.id}`}>{build.title}</Link>
            ) : (
              'Untitled Build'
            )}
          </h1>
          <span className={`badge ${STATUS_BADGE[request.status] || 'badge--secondary'}`}>
            {request.status.replace('_', ' ')}
          </span>
        </div>

        <div className="card__body">
          <div className="request-card__budget" style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>
            <strong>Budget:</strong> {formatCurrency(request.budget || 0)}
          </div>

          {request.purpose && (
            <p><strong>Purpose:</strong> {request.purpose}</p>
          )}

          {request.notes && (
            <p><strong>Notes:</strong> {request.notes}</p>
          )}

          {request.preferred_builder_id && (() => {
            const preferredBuilder = getUser(request.preferred_builder_id);
            return preferredBuilder ? (
              <p style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
                Wished to be built by{' '}
                <Link to={`/profile/${preferredBuilder.id}`}>{preferredBuilder.display_name}</Link>
              </p>
            ) : null;
          })()}

          <div className="card__meta" style={{ marginTop: '1rem' }}>
            <span>
              Posted by{' '}
              {poster ? (
                <Link to={`/profile/${poster.id}`}>{poster.display_name}</Link>
              ) : (
                'Unknown'
              )}
            </span>
            <span>{formatDate(request.created_at)}</span>
          </div>

          {/* Parts list */}
          {parts.length > 0 && (
            <div style={{ marginTop: '1.5rem' }}>
              <h3>Build Parts</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Part</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {parts.map((bp) => (
                    <tr key={bp.id}>
                      <td>{bp.category ? bp.category.name : 'Unknown'}</td>
                      <td>{bp.part ? bp.part.name : 'Unknown Part'}</td>
                      <td>{bp.part ? formatCurrency(bp.part.price) : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Owner actions */}
          {isOwner && (
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
              {(request.status === 'in_progress' || request.status === 'claimed') && (
                <button className="btn btn--success" onClick={handleMarkComplete}>
                  Mark Complete
                </button>
              )}
              {request.status === 'open' && (
                <button className="btn btn--danger" onClick={handleCancel}>
                  Cancel Request
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Offers Section */}
      <div>
        <h2>Offers ({offers.length})</h2>

        {/* Offer form for builders */}
        {isBuilder && !isOwner && request.status === 'open' && !alreadyOffered && (
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div className="card__header">
              <h3>Submit an Offer</h3>
            </div>
            <div className="card__body">
              <form onSubmit={handleSubmitOffer}>
                {offerError && (
                  <div className="alert alert--danger" style={{ marginBottom: '1rem' }}>
                    {offerError}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label" htmlFor="offer-fee">Fee ($)</label>
                  <input
                    id="offer-fee"
                    type="number"
                    className="form-input"
                    min="0"
                    step="0.01"
                    value={offerFee}
                    onChange={(e) => setOfferFee(e.target.value)}
                    placeholder="0 means free"
                  />
                  <span className="text--muted">Enter 0 for a free build service.</span>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="offer-message">Message *</label>
                  <textarea
                    id="offer-message"
                    className="form-input"
                    rows="4"
                    value={offerMessage}
                    onChange={(e) => setOfferMessage(e.target.value)}
                    placeholder="Describe your experience and approach for this build..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="offer-contact">Contact Info *</label>
                  <input
                    id="offer-contact"
                    type="text"
                    className="form-input"
                    value={offerContact}
                    onChange={(e) => setOfferContact(e.target.value)}
                    placeholder="Email, phone, or Discord username"
                    required
                  />
                </div>

                <button type="submit" className="btn btn--primary">Submit Offer</button>
              </form>
            </div>
          </div>
        )}

        {isBuilder && alreadyOffered && request.status === 'open' && (
          <div className="alert alert--info" style={{ marginBottom: '1rem' }}>
            You have already submitted an offer for this request.
          </div>
        )}

        {/* Offer list */}
        {offers.length === 0 ? (
          <div className="empty-state">
            <p>No offers have been submitted yet.</p>
          </div>
        ) : (
          <div className="offer-list">
            {offers.map((offer) => {
              const builder = getUser(offer.builder_id);
              const profile = getBuilderProfile(offer.builder_id);
              const isAccepted = offer.status === 'accepted';

              return (
                <div key={offer.id} className="card offer-card" style={{ marginBottom: '1rem' }}>
                  <div className="card__header">
                    <h4>
                      {builder ? (
                        <Link to={`/profile/${builder.id}`}>{builder.display_name}</Link>
                      ) : (
                        'Unknown Builder'
                      )}
                    </h4>
                    <span className={`badge ${
                      offer.status === 'accepted' ? 'badge--success' :
                      offer.status === 'rejected' ? 'badge--danger' :
                      'badge--secondary'
                    }`}>
                      {offer.status}
                    </span>
                  </div>

                  <div className="card__body">
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong>Fee:</strong>{' '}
                      {Number(offer.fee) === 0 ? (
                        <span className="badge badge--success">Free</span>
                      ) : (
                        formatCurrency(offer.fee)
                      )}
                    </div>

                    <p>{offer.message}</p>

                    {profile && (
                      <div className="offer-card__stats" style={{ marginTop: '0.5rem', color: 'var(--color-text-muted)' }}>
                        {profile.years_of_experience != null && (
                          <span>{profile.years_of_experience} years experience</span>
                        )}
                        {profile.completed_builds != null && (
                          <span> &middot; {profile.completed_builds} builds completed</span>
                        )}
                        {profile.avg_rating != null && (
                          <span> &middot; {profile.avg_rating.toFixed(1)} avg rating</span>
                        )}
                      </div>
                    )}

                    {/* Accept button - visible to request owner */}
                    {isOwner && (request.status === 'open' || request.status === 'claimed') && offer.status === 'pending' && (
                      <button
                        className="btn btn--success"
                        style={{ marginTop: '0.75rem' }}
                        onClick={() => handleAcceptOffer(offer.id)}
                      >
                        Accept Offer
                      </button>
                    )}

                    {/* Show contact info for accepted offer */}
                    {isAccepted && (isOwner || (isAuthenticated && user.id === offer.builder_id)) && (
                      <div className="offer-card__contact" style={{ marginTop: '0.75rem', padding: '0.75rem', background: 'var(--color-bg-secondary, #f5f5f5)', borderRadius: '0.5rem' }}>
                        <strong>Contact Information:</strong> {offer.contact_info}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
