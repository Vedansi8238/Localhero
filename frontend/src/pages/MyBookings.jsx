import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MyBookings.css';

function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (!loggedInUser) {
      alert('Please login first!');
      navigate('/login');
      return;
    }
    const user = JSON.parse(loggedInUser);
    fetchBookings(user._id);
  }, []);

  const fetchBookings = async (userId) => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookings/user/' + userId);
      setBookings(response.data);
    } catch (err) {
      console.log('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (status === 'Confirmed' || status === 'confirmed') return 'status-green';
    if (status === 'Rejected' || status === 'rejected') return 'status-red';
    return 'status-orange';
  };

  if (loading) {
    return (
      <div className="mybookings-page">
        <h1>My Bookings</h1>
        <div className="no-bookings">
          <p>Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mybookings-page">
      <h1>My Bookings</h1>
      <p className="subtitle">All your booked workers in one place!</p>

      {bookings.length === 0 ? (
        <div className="no-bookings">
          <h3>No Bookings Yet!</h3>
          <p>You have not booked any worker yet.</p>
          <button onClick={() => navigate('/browse')}>
            Browse Workers
          </button>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking, index) => (
            <div className="booking-card" key={index}>
              <div className="booking-header">
                <div className="worker-header-info">
                  <h3>{booking.workerName}</h3>
                  <p>{booking.workerSkill}</p>
                </div>
                <span className={'status-badge ' + getStatusColor(booking.status)}>
                  {booking.status}
                </span>
              </div>
              <div className="booking-details">
                <div className="detail-row">
                  <div>
                    <p className="detail-label">Date and Time</p>
                    <p className="detail-value">{booking.date} at {booking.time}</p>
                  </div>
                </div>
                <div className="detail-row">
                  <div>
                    <p className="detail-label">Address</p>
                    <p className="detail-value">{booking.address}</p>
                  </div>
                </div>
                <div className="detail-row">
                  <div>
                    <p className="detail-label">Problem</p>
                    <p className="detail-value">{booking.description}</p>
                  </div>
                </div>
              </div>
              <div className="booking-actions">
                <button className="browse-again-btn" onClick={() => navigate('/browse')}>
                  Book Another Worker
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;