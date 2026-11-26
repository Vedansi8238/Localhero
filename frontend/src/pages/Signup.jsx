import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !phone || !password || !confirm) {
      setError('Please fill in all fields!');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match!');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name, email, password, phone
      });
      alert('Account Created Successfully! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>🦸 Join LocalHero!</h2>
        <p>Create your free account today</p>

        {error && <div className="error-msg">{error}</div>}

        <input type="text" placeholder="Enter your full name"
          value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Enter your email"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="tel" placeholder="Enter your phone number"
          value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input type="password" placeholder="Create a password"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm your password"
          value={confirm} onChange={(e) => setConfirm(e.target.value)} />

        <button onClick={handleSignup} disabled={loading}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>

        <p className="switch-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;