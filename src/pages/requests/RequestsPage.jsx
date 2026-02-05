import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
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

export default function RequestsPage() {
  const { getRequests, getItemById, getUser } = useData();
  const { isAuthenticated } = useAuth();
  const [statusFilter, setStatusFilter] = useState('open');

  const requests = useMemo(() => {
    const filters = statusFilter === 'all' ? {} : { status: statusFilter };
    return getRequests(filters);
  }, [statusFilter, getRequests]);

  return (
    <div className="page">
      <div className="page__header">
        <h1>Request Board</h1>
        <p>
          Browse build requests from users looking for professional builders.
          Builders can submit offers to fulfil these requests.
        </p>
      </div>

      <div className="filter-bar">
        <select
          className="filter-bar__sort"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="open">Open</option>
          <option value="claimed">Claimed</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        {isAuthenticated && (
          <Link to="/builds/new?request=true" className="btn btn--primary">
            Post a Request
          </Link>
        )}
      </div>

      {requests.length === 0 ? (
        <div className="empty-state">
          <p>No requests found for the selected status.</p>
        </div>
      ) : (
        <div className="grid grid--2">
          {requests.map((request) => {
            const build = getItemById('builds', request.build_id);
            const poster = getUser(request.user_id);

            return (
              <Link
                to={`/requests/${request.id}`}
                key={request.id}
                className="card card--hover request-card"
              >
                <img
                  className="card__image"
                  src="https://www.shutterstock.com/image-vector/gaming-pc-wireframe-drawing-line-600nw-2588972631.jpg"
                  alt="PC Build"
                />
                <div className="card__header">
                  <h3 className="card__title">
                    {build ? build.title : 'Untitled Build'}
                  </h3>
                  <span className={`badge ${STATUS_BADGE[request.status] || 'badge--secondary'}`}>
                    {request.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="card__body">
                  <div className="request-card__budget">
                    <strong>Budget:</strong> {formatCurrency(request.budget || 0)}
                  </div>

                  {request.purpose && (
                    <p className="card__description">
                      <strong>Purpose:</strong> {request.purpose}
                    </p>
                  )}

                  {request.notes && (
                    <p className="card__description">
                      {request.notes.length > 120
                        ? request.notes.slice(0, 120) + '...'
                        : request.notes}
                    </p>
                  )}

                  {request.preferred_builder_id && (() => {
                    const preferredBuilder = getUser(request.preferred_builder_id);
                    return preferredBuilder ? (
                      <p className="card__description" style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
                        Wished to be built by {preferredBuilder.display_name}
                      </p>
                    ) : null;
                  })()}

                  <div className="card__meta">
                    <span className="card__creator">
                      Posted by {poster ? poster.display_name : 'Unknown'}
                    </span>
                    <span className="card__date">{formatDate(request.created_at)}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
