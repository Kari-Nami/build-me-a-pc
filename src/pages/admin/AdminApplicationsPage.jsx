import { useState, useMemo } from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { formatDate } from '../../utils/helpers';

export default function AdminApplicationsPage() {
  const { getApplications, editItem, createItem, getUser } = useData();
  const { user: adminUser } = useAuth();

  const [tab, setTab] = useState('pending');
  const [adminNotes, setAdminNotes] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);

  const applications = useMemo(
    () => getApplications({ status: tab }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tab, getApplications, refreshKey]
  );

  const loadApplications = () => {
    setRefreshKey((k) => k + 1);
  };

  const handleNotesChange = (appId, value) => {
    setAdminNotes((prev) => ({ ...prev, [appId]: value }));
  };

  const handleApprove = (app) => {
    const notes = adminNotes[app.id] || '';
    const now = new Date().toISOString();

    // 1. Update the application status
    editItem('builder_apps', app.id, {
      status: 'approved',
      reviewed_by: adminUser.id,
      reviewed_at: now,
      admin_notes: notes,
    });

    // 2. Promote user to builder role
    editItem('users', app.user_id, { role: 'builder' });

    // 3. Create builder profile
    createItem('builder_profiles', {
      user_id: app.user_id,
      business_name: app.business_name,
      registration_number: app.registration_number,
      address: app.address,
      website: app.website,
      portfolio_url: app.portfolio_url,
      years_of_experience: app.years_of_experience,
      specialization: app.specialization,
      avg_rating: 0,
      avg_response_time_hrs: null,
      completed_builds: 0,
      is_verified: true,
    });

    loadApplications();
  };

  const handleReject = (app) => {
    const notes = adminNotes[app.id] || '';
    const now = new Date().toISOString();

    editItem('builder_apps', app.id, {
      status: 'rejected',
      reviewed_by: adminUser.id,
      reviewed_at: now,
      admin_notes: notes,
    });

    loadApplications();
  };

  const getApplicantName = (userId) => {
    const u = getUser(userId);
    return u ? u.display_name : 'Unknown User';
  };

  const tabs = ['pending', 'approved', 'rejected'];

  return (
    <div className="page">
      <div className="page__header">
        <h1>Builder Applications</h1>
      </div>

      <div className="tabs">
        {tabs.map((t) => (
          <button
            key={t}
            className={`tabs__tab ${tab === t ? 'tabs__tab--active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {applications.length === 0 ? (
        <div className="empty-state">
          <p>No {tab} applications found.</p>
        </div>
      ) : (
        <div className="grid grid--2">
          {applications.map((app) => (
            <div key={app.id} className="card">
              <div className="card__body">
                <h3 className="card__title">
                  {getApplicantName(app.user_id)}
                </h3>
                <span className="badge badge--secondary">
                  {app.application_type || 'N/A'}
                </span>

                <div className="card__details">
                  {app.business_name && (
                    <p><strong>Business Name:</strong> {app.business_name}</p>
                  )}
                  {app.registration_number && (
                    <p><strong>Registration Number:</strong> {app.registration_number}</p>
                  )}
                  {app.website && (
                    <p><strong>Website:</strong> {app.website}</p>
                  )}
                  {app.portfolio_url && (
                    <p><strong>Portfolio:</strong> {app.portfolio_url}</p>
                  )}
                  {app.years_of_experience != null && (
                    <p><strong>Years of Experience:</strong> {app.years_of_experience}</p>
                  )}
                  {app.specialization && (
                    <p><strong>Specialization:</strong> {app.specialization}</p>
                  )}
                  <p><strong>Submitted:</strong> {formatDate(app.created_at)}</p>
                </div>

                {tab === 'pending' && (
                  <div className="card__actions">
                    <div className="form-group">
                      <label className="form-label">Admin Notes</label>
                      <textarea
                        className="form-input"
                        rows={3}
                        value={adminNotes[app.id] || ''}
                        onChange={(e) => handleNotesChange(app.id, e.target.value)}
                        placeholder="Optional notes for this application..."
                      />
                    </div>
                    <button
                      className="btn btn--success"
                      onClick={() => handleApprove(app)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn--danger"
                      onClick={() => handleReject(app)}
                    >
                      Reject
                    </button>
                  </div>
                )}

                {(tab === 'approved' || tab === 'rejected') && (
                  <div className="card__review">
                    {app.admin_notes && (
                      <p><strong>Admin Notes:</strong> {app.admin_notes}</p>
                    )}
                    {app.reviewed_at && (
                      <p><strong>Reviewed:</strong> {formatDate(app.reviewed_at)}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
