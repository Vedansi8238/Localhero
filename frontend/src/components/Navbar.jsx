import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [user, setUser] = useState(null);
  const [worker, setWorker] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const checkLogin = () => {
    const storedUser = localStorage.getItem('user');
    const storedWorker = localStorage.getItem('worker');
    setUser(storedUser ? JSON.parse(storedUser) : null);
    setWorker(storedWorker ? JSON.parse(storedWorker) : null);
  };

  useEffect(() => {
    checkLogin();
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('worker');
    setUser(null);
    setWorker(null);
    navigate('/');
  };

  const isAdminPage = location.pathname === '/admin';
  const loggedInName = isAdminPage ? null : worker ? worker.name : user ? user.name : null;

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px' }}>
          LocalHero
        </Link>
        {loggedInName && (
          <span style={{ fontSize: '13px', color: '#ff6b35', marginLeft: '12px', fontWeight: '600' }}>
            | Hi, {loggedInName}!
          </span>
        )}
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/browse">Browse Workers</Link>
        <Link to="/mybookings">My Bookings</Link>
        <Link to="/contact">Help</Link>
        {!isAdminPage && worker ? (
          <>
            <Link to="/worker-dashboard" style={{ color: '#ff6b35', fontWeight: 'bold' }}>My Dashboard</Link>
            <button onClick={handleLogout} style={{ background: '#ff6b35', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
          </>
        ) : !isAdminPage && user ? (
          <button onClick={handleLogout} style={{ background: '#ff6b35', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
        ) : !isAdminPage ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        ) : null}
        <Link to="/admin" className="admin-link">Admin</Link>
      </div>
    </nav>
  );
}

export default Navbar;