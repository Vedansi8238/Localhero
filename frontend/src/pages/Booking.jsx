import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Booking.css';

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const worker = location.state?.worker;

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleBooking = async () => {
    if (!worker) {
      setError("Worker data missing! Please book from Browse page.");
      return;
    }

    const loggedInUser = localStorage.getItem('user');
    if (!loggedInUser) {
      alert('Please login first to book a worker!');
      navigate('/login');
      return;
    }

    if (!date || !time || !address || !description) {
      setError("Please fill all fields");
      return;
    }

    try {
      const user = JSON.parse(loggedInUser);
      await axios.post('http://localhost:5000/api/bookings/create', {
        userId: user._id,
        workerId: worker._id,
        workerName: worker.name,
        workerSkill: worker.skill,
        date: date,
        time: time,
        address: address,
        description: description,
        status: 'Pending'
      });
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setError("Booking failed! Check backend.");
    }
  };

  if (success) {
    return (
      <div className="booking-page">
        <div className="success-box">
          <h2>Booking Submitted!</h2>
          <p>Worker: {worker.name}</p>
          <p>Date: {date} at {time}</p>
          <p style={{ color: 'orange', fontWeight: 'bold', marginTop: '10px' }}>
            Status: Pending
          </p>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Waiting for worker or admin confirmation...
          </p>
          <button onClick={() => navigate('/mybookings')} style={{ marginTop: '15px', marginRight: '10px', padding: '10px 20px', background: '#ff6b35', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            View My Bookings
          </button>
          <button onClick={() => navigate('/browse')} style={{ marginTop: '15px', padding: '10px 20px', background: '#666', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Book Another Worker
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-box">
        <h2>Book Worker</h2>

        {worker && (
          <div className="worker-summary">
            <h3>{worker.name}</h3>
            <p>{worker.skill} | {worker.city} | {worker.price}</p>
          </div>
        )}

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <label>Date</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />

        <label>Time</label>
        <input type="time" value={time} onChange={e => setTime(e.target.value)} />

        <label>Address</label>
        <input type="text" value={address} onChange={e => setAddress(e.target.value)} />

        <label>Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} />

        <button onClick={handleBooking}>Confirm Booking</button>
        <button onClick={() => navigate('/browse')}>Back</button>
      </div>
    </div>
  );
}

export default Booking;