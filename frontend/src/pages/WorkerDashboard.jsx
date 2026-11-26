import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function WorkerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [worker, setWorker] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedWorker = localStorage.getItem('worker');
    if (!storedWorker) {
      navigate('/worker-login');
      return;
    }
    const w = JSON.parse(storedWorker);
    setWorker(w);
    fetchBookings(w._id);
    const interval = setInterval(() => {
      fetchBookings(w._id);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchBookings = async (workerId) => {
    try {
      const res = await axios.get('http://localhost:5000/api/bookings/worker/' + workerId);
      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleConfirm = async (id) => {
    try {
      await axios.put('http://localhost:5000/api/bookings/confirm/' + id);
      alert('Booking Confirmed!');
      if (worker) fetchBookings(worker._id);
    } catch (err) {
      alert('Error confirming booking');
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put('http://localhost:5000/api/bookings/reject/' + id);
      alert('Booking Rejected!');
      if (worker) fetchBookings(worker._id);
    } catch (err) {
      alert('Error rejecting booking');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('worker');
    navigate('/worker-login');
  };

  return (
    <div style={{ padding: '30px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h2 style={{ color: '#ff6b35' }}>Worker Dashboard</h2>
          {worker && <p style={{ color: '#666' }}>Welcome, {worker.name}!</p>}
        </div>
        <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#ff6b35', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>
      <h3>My Bookings ({bookings.length})</h3>
      {bookings.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>No bookings yet!</p>
      ) : (
        bookings.map(booking => (
          <div key={booking._id} style={{ background: 'white', padding: '20px', marginBottom: '15px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderLeft: '5px solid ' + (booking.status === 'confirmed' || booking.status === 'Confirmed' ? 'green' : booking.status === 'rejected' || booking.status === 'Rejected' ? 'red' : 'orange') }}>
            <p><strong>Customer Address:</strong> {booking.address}</p>
            <p><strong>Date:</strong> {booking.date}</p>
            <p><strong>Time:</strong> {booking.time}</p>
            <p><strong>Problem:</strong> {booking.description}</p>
            <p><strong>Status:</strong>
              <span style={{ color: booking.status === 'confirmed' || booking.status === 'Confirmed' ? 'green' : booking.status === 'rejected' || booking.status === 'Rejected' ? 'red' : 'orange', fontWeight: 'bold', marginLeft: '5px' }}>
                {booking.status}
              </span>
            </p>
            {(booking.status === 'pending' || booking.status === 'Pending') && (
              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button onClick={() => handleConfirm(booking._id)} style={{ padding: '10px 25px', background: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold' }}>
                  Confirm
                </button>
                <button onClick={() => handleReject(booking._id)} style={{ padding: '10px 25px', background: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold' }}>
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default WorkerDashboard;