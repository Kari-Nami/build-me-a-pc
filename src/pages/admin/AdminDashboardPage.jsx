import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';

export default function AdminDashboardPage() {
  const { getUsers, getAll, getApplications } = useData();

  const stats = useMemo(() => ({
    users: getUsers().length,
    builds: getAll('builds').length,
    parts: getAll('parts').length,
    pendingApps: getApplications({ status: 'pending' }).length,
  }), [getUsers, getAll, getApplications]);

  return (
    <div className="page">
      <div className="page__header">
        <h1>Admin Dashboard</h1>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-card__value">{stats.users}</div>
          <div className="stat-card__label">Total Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__value">{stats.builds}</div>
          <div className="stat-card__label">Total Builds</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__value">{stats.parts}</div>
          <div className="stat-card__label">Total Parts</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__value">{stats.pendingApps}</div>
          <div className="stat-card__label">Pending Applications</div>
        </div>
      </div>

      <div className="page__header">
        <h2>Quick Links</h2>
      </div>

      <div className="grid grid--3">
        <Link to="/admin/parts" className="card card--hover">
          <div className="card__body">
            <h3 className="card__title">Parts Management</h3>
            <p className="card__description">Add, edit, or remove parts from the catalog.</p>
          </div>
        </Link>
        <Link to="/admin/users" className="card card--hover">
          <div className="card__body">
            <h3 className="card__title">User Management</h3>
            <p className="card__description">Manage user accounts, roles, and bans.</p>
          </div>
        </Link>
        <Link to="/admin/applications" className="card card--hover">
          <div className="card__body">
            <h3 className="card__title">Applications Review</h3>
            <p className="card__description">Review pending builder applications.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
