import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { formatCurrency } from '../../utils/helpers';

export default function AdminPartsPage() {
  const { getAllParts, getCategories, removeItem } = useData();

  const [parts, setParts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [search, setSearch] = useState('');
  const [showActive, setShowActive] = useState('all');

  const loadParts = () => {
    setParts(getAllParts());
  };

  useEffect(() => {
    setCategories(getCategories());
    loadParts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAllParts, getCategories]);

  const handleDelete = (partId, partName) => {
    if (!window.confirm(`Are you sure you want to delete "${partName}"?`)) return;
    removeItem('parts', partId);
    loadParts();
  };

  const getCategoryName = (categoryId) => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat ? cat.name : 'Unknown';
  };

  const filteredParts = parts.filter((part) => {
    if (filterCategory && part.category_id !== filterCategory) return false;
    if (showActive === 'active' && !part.is_active) return false;
    if (showActive === 'inactive' && part.is_active) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      if (
        !part.name.toLowerCase().includes(q) &&
        !part.brand.toLowerCase().includes(q) &&
        !getCategoryName(part.category_id).toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="page">
      <div className="page__header">
        <h1>Parts Management</h1>
        <Link to="/admin/parts/new" className="btn btn--primary">
          Add New Part
        </Link>
      </div>

      <div className="filter-bar">
        <select
          className="filter-bar__sort"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="filter-bar__search"
          placeholder="Search by name, brand, or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="filter-bar__sort"
          value={showActive}
          onChange={(e) => setShowActive(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active Only</option>
          <option value="inactive">Inactive Only</option>
        </select>
      </div>

      {filteredParts.length === 0 ? (
        <div className="empty-state">
          <p>No parts found matching your filters.</p>
        </div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredParts.map((part) => (
              <tr key={part.id}>
                <td>{part.name}</td>
                <td>{getCategoryName(part.category_id)}</td>
                <td>{part.brand}</td>
                <td>{formatCurrency(part.price)}</td>
                <td>
                  <span
                    className={
                      part.is_active
                        ? 'badge badge--success'
                        : 'badge badge--danger'
                    }
                  >
                    {part.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <Link
                    to={`/admin/parts/${part.id}/edit`}
                    className="btn btn--small btn--outline"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn--small btn--danger"
                    onClick={() => handleDelete(part.id, part.name)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
