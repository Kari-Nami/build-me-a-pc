import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { formatDate } from '../../utils/helpers';

export default function AdminUsersPage() {
  const { getUsers, editItem } = useData();

  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState('all');
  const [search, setSearch] = useState('');
  const [roleEdits, setRoleEdits] = useState({});

  const loadUsers = () => {
    setUsers(getUsers());
  };

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUsers]);

  const handleBanToggle = (userId, currentBanned) => {
    editItem('users', userId, { is_banned: !currentBanned });
    loadUsers();
  };

  const handleRoleChange = (userId, newRole) => {
    setRoleEdits((prev) => ({ ...prev, [userId]: newRole }));
  };

  const handleRoleSave = (userId) => {
    const newRole = roleEdits[userId];
    if (!newRole) return;
    editItem('users', userId, { role: newRole });
    setRoleEdits((prev) => {
      const copy = { ...prev };
      delete copy[userId];
      return copy;
    });
    loadUsers();
  };

  const filteredUsers = users.filter((u) => {
    if (filterRole !== 'all' && u.role !== filterRole) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      if (
        !u.display_name.toLowerCase().includes(q) &&
        !u.email.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="page">
      <div className="page__header">
        <h1>User Management</h1>
      </div>

      <div className="filter-bar">
        <select
          className="filter-bar__sort"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="user">User</option>
          <option value="builder">Builder</option>
          <option value="admin">Admin</option>
        </select>

        <input
          type="text"
          className="filter-bar__search"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredUsers.length === 0 ? (
        <div className="empty-state">
          <p>No users found matching your filters.</p>
        </div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Banned</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.display_name}</td>
                <td>{u.email}</td>
                <td>
                  <span className="badge badge--secondary">{u.role}</span>
                </td>
                <td>
                  <span
                    className={
                      u.is_banned
                        ? 'badge badge--danger'
                        : 'badge badge--success'
                    }
                  >
                    {u.is_banned ? 'Banned' : 'Active'}
                  </span>
                </td>
                <td>{formatDate(u.created_at)}</td>
                <td>
                  <button
                    className={`btn btn--small ${u.is_banned ? 'btn--success' : 'btn--danger'}`}
                    onClick={() => handleBanToggle(u.id, u.is_banned)}
                  >
                    {u.is_banned ? 'Unban' : 'Ban'}
                  </button>

                  <select
                    className="form-select form-select--inline"
                    value={roleEdits[u.id] || u.role}
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                  >
                    <option value="user">user</option>
                    <option value="builder">builder</option>
                    <option value="admin">admin</option>
                  </select>
                  {roleEdits[u.id] && roleEdits[u.id] !== u.role && (
                    <button
                      className="btn btn--small btn--primary"
                      onClick={() => handleRoleSave(u.id)}
                    >
                      Save
                    </button>
                  )}

                  <Link
                    to={`/profile/${u.id}`}
                    className="btn btn--small btn--outline"
                  >
                    Profile
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
