import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('adminLoggedIn') === 'true');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({});
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [newWorker, setNewWorker] = useState({ name: '', skill: '', city: '', price: '' });
  const [workerMsg, setWorkerMsg] = useState('');
  const [editWorker, setEditWorker] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetchStats();
      fetchBookings();
      fetchUsers();
      fetchWorkers();
      const interval = setInterval(() => {
        fetchStats();
        fetchBookings();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  const handleLogin = async () => {
    try {
      await axios.post('http://localhost:5000/api/admin/login', { email, password });
      setIsLoggedIn(true);
      sessionStorage.setItem('adminLoggedIn', 'true');
      setLoginError('');
    } catch (err) {
      setLoginError('Wrong email or password!');
    }
  };

  const fetchStats = async () => {
    const res = await axios.get('http://localhost:5000/api/admin/stats');
    setStats(res.data);
  };

  const fetchBookings = async () => {
    const res = await axios.get('http://localhost:5000/api/admin/bookings');
    setBookings(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/api/admin/users');
    setUsers(res.data);
  };

  const fetchWorkers = async () => {
    const res = await axios.get('http://localhost:5000/api/admin/workers');
    setWorkers(res.data);
  };

  const updateBookingStatus = async (id, status) => {
    await axios.put('http://localhost:5000/api/admin/bookings/' + id, { status });
    fetchBookings();
    fetchStats();
  };

  const deleteUser = async (id) => {
    if (window.confirm('Delete this user?')) {
      await axios.delete('http://localhost:5000/api/admin/users/' + id);
      fetchUsers();
      fetchStats();
    }
  };

  const deleteWorker = async (id) => {
    if (window.confirm('Delete this worker?')) {
      await axios.delete('http://localhost:5000/api/admin/workers/' + id);
      fetchWorkers();
      fetchStats();
    }
  };

  const addWorker = async () => {
    if (!newWorker.name || !newWorker.skill || !newWorker.city || !newWorker.price) {
      setWorkerMsg('Please fill all fields!'); return;
    }
    try {
      await axios.post('http://localhost:5000/api/admin/workers', newWorker);
      setWorkerMsg('Worker added successfully!');
      setNewWorker({ name: '', skill: '', city: '', price: '' });
      fetchWorkers();
      fetchStats();
    } catch (err) {
      setWorkerMsg('Failed to add worker!');
    }
  };

  const verifyWorker = async (id, status) => {
    await axios.put('http://localhost:5000/api/admin/workers/' + id, { isVerified: status });
    fetchWorkers();
  };

  const toggleAvailable = async (id, status) => {
    await axios.put('http://localhost:5000/api/admin/workers/' + id, { isAvailable: status });
    fetchWorkers();
  };

  const startEdit = (worker) => {
    setEditWorker({ ...worker });
  };

  const saveEdit = async () => {
    await axios.put('http://localhost:5000/api/admin/workers/' + editWorker._id, editWorker);
    setEditWorker(null);
    fetchWorkers();
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-box">
          <h1>Admin Login</h1>
          <p className="admin-login-sub">LocalHero Control Panel</p>
          {loginError && <div className="admin-error">{loginError}</div>}
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />
          <button onClick={handleLogin}>Login to Admin Panel</button>
          <p className="admin-hint">Default: admin@localhero.com / admin123</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-sidebar">
        <div className="admin-brand">
          <h2>LocalHero</h2>
          <p>Admin Panel</p>
        </div>
        <nav className="admin-nav">
          <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
            Dashboard
          </button>
          <button className={activeTab === 'bookings' ? 'active' : ''} onClick={() => setActiveTab('bookings')}>
            Bookings <span className="badge">{stats.totalBookings || 0}</span>
          </button>
          <button className={activeTab === 'workers' ? 'active' : ''} onClick={() => setActiveTab('workers')}>
            Workers <span className="badge">{stats.totalWorkers || 0}</span>
          </button>
          <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
            Users <span className="badge">{stats.totalUsers || 0}</span>
          </button>
        </nav>
        <button className="admin-logout" onClick={() => { setIsLoggedIn(false); sessionStorage.removeItem('adminLoggedIn'); }}>Logout</button>
      </div>

      <div className="admin-content">

        {activeTab === 'dashboard' && (
          <div className="admin-section">
            <h1>Dashboard Overview</h1>
            <p className="admin-section-sub">Welcome back, Admin!</p>
            <div className="stats-grid">
              <div className="stat-card blue">
                <div className="stat-info"><h3>{stats.totalBookings || 0}</h3><p>Total Bookings</p></div>
              </div>
              <div className="stat-card orange">
                <div className="stat-info"><h3>{stats.pendingBookings || 0}</h3><p>Pending</p></div>
              </div>
              <div className="stat-card green">
                <div className="stat-info"><h3>{stats.confirmedBookings || 0}</h3><p>Confirmed</p></div>
              </div>
              <div className="stat-card red">
                <div className="stat-info"><h3>{stats.rejectedBookings || 0}</h3><p>Rejected</p></div>
              </div>
              <div className="stat-card purple">
                <div className="stat-info"><h3>{stats.totalWorkers || 0}</h3><p>Workers</p></div>
              </div>
              <div className="stat-card teal">
                <div className="stat-info"><h3>{stats.totalUsers || 0}</h3><p>Users</p></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="admin-section">
            <h1>All Bookings</h1>
            <p className="admin-section-sub">Manage and update booking statuses</p>
            {bookings.length === 0 ? (
              <div className="empty-state">No bookings yet!</div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>#</th><th>Worker</th><th>Skill</th><th>Date</th>
                      <th>Address</th><th>Status</th><th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b, i) => (
                      <tr key={b._id}>
                        <td>{i + 1}</td>
                        <td><strong>{b.workerName || 'N/A'}</strong></td>
                        <td>{b.workerSkill || 'N/A'}</td>
                        <td>{b.date} {b.time}</td>
                        <td>{b.address}</td>
                        <td>
                          <span className={'status-pill ' + (b.status === 'Confirmed' || b.status === 'confirmed' ? 'green' : b.status === 'Rejected' || b.status === 'rejected' ? 'red' : 'orange')}>
                            {b.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-btns">
                            <button className="btn-confirm" onClick={() => updateBookingStatus(b._id, 'Confirmed')}>Confirm</button>
                            <button className="btn-reject" onClick={() => updateBookingStatus(b._id, 'Rejected')}>Reject</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'workers' && (
          <div className="admin-section">
            <h1>Manage Workers</h1>
            <p className="admin-section-sub">Add or remove workers</p>
            <div className="add-form">
              <h3>Add New Worker</h3>
              {workerMsg && <div className={'form-msg ' + (workerMsg.includes('success') ? 'success' : 'error')}>{workerMsg}</div>}
              <div className="form-row">
                <input placeholder="Worker Name" value={newWorker.name} onChange={e => setNewWorker({ ...newWorker, name: e.target.value })} />
                <input placeholder="Skill (e.g. Plumber)" value={newWorker.skill} onChange={e => setNewWorker({ ...newWorker, skill: e.target.value })} />
                <input placeholder="City" value={newWorker.city} onChange={e => setNewWorker({ ...newWorker, city: e.target.value })} />
                <input placeholder="Price" value={newWorker.price} onChange={e => setNewWorker({ ...newWorker, price: e.target.value })} />
                <button className="btn-add" onClick={addWorker}>Add Worker</button>
              </div>
            </div>

            {editWorker && (
              <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                <div style={{ background: 'white', padding: '30px', borderRadius: '10px', width: '400px' }}>
                  <h3>Edit Worker</h3>
                  <input placeholder="Name" value={editWorker.name} onChange={e => setEditWorker({ ...editWorker, name: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
                  <input placeholder="Skill" value={editWorker.skill} onChange={e => setEditWorker({ ...editWorker, skill: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
                  <input placeholder="City" value={editWorker.city} onChange={e => setEditWorker({ ...editWorker, city: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
                  <input placeholder="Price" value={editWorker.price} onChange={e => setEditWorker({ ...editWorker, price: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
                  <input placeholder="Email" value={editWorker.email || ''} onChange={e => setEditWorker({ ...editWorker, email: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
                  <input placeholder="Password" value={editWorker.password || ''} onChange={e => setEditWorker({ ...editWorker, password: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={saveEdit} style={{ padding: '10px 20px', background: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Save</button>
                    <button onClick={() => setEditWorker(null)} style={{ padding: '10px 20px', background: 'gray', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>
                  </div>
                </div>
              </div>
            )}

            {workers.length === 0 ? (
              <div className="empty-state">No workers yet!</div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>#</th><th>Name</th><th>Skill</th><th>City</th>
                      <th>Price</th><th>Rating</th><th>Available</th><th>Verified</th><th>Edit</th><th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workers.map((w, i) => (
                      <tr key={w._id}>
                        <td>{i + 1}</td>
                        <td><strong>{w.name}</strong></td>
                        <td>{w.skill}</td>
                        <td>{w.city}</td>
                        <td>{w.price}</td>
                        <td>{w.rating} star</td>
                        <td>
                          <button onClick={() => toggleAvailable(w._id, !w.isAvailable)} style={{ padding: '5px 10px', background: w.isAvailable ? 'green' : 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            {w.isAvailable ? 'Yes' : 'No'}
                          </button>
                        </td>
                        <td>
                          <button onClick={() => verifyWorker(w._id, !w.isVerified)} style={{ padding: '5px 10px', background: w.isVerified ? 'green' : 'gray', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            {w.isVerified ? 'Verified' : 'Verify'}
                          </button>
                        </td>
                        <td>
                          <button onClick={() => startEdit(w)} style={{ padding: '5px 10px', background: '#ff6b35', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Edit</button>
                        </td>
                        <td>
                          <button onClick={() => deleteWorker(w._id)} style={{ padding: '5px 10px', background: '#cc0000', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'users' && (
          <div className="admin-section">
            <h1>All Users</h1>
            <p className="admin-section-sub">View and manage registered users</p>
            {users.length === 0 ? (
              <div className="empty-state">No users registered yet!</div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>#</th><th>Name</th><th>Email</th><th>Phone</th>
                      <th>Role</th><th>Joined</th><th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, i) => (
                      <tr key={u._id}>
                        <td>{i + 1}</td>
                        <td><strong>{u.name}</strong></td>
                        <td>{u.email}</td>
                        <td>{u.phone}</td>
                        <td><span className="status-pill blue">{u.role}</span></td>
                        <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                        <td><button onClick={() => deleteUser(u._id)} style={{ padding: '5px 10px', background: '#cc0000', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminPanel;