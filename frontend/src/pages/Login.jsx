import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields!');
      return;
    }
    try {
      if (loginType === 'customer') {
        const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
        localStorage.setItem('user', JSON.stringify(res.data.user));
        window.dispatchEvent(new Event('storage'));
        alert('Welcome back, ' + res.data.user.name + '!');
        navigate('/');
      } else {
        const res = await axios.post('http://localhost:5000/api/workers/login', { email, password });
        localStorage.setItem('worker', JSON.stringify(res.data.worker));
        alert('Welcome, ' + res.data.worker.name + '!');
        navigate('/worker-dashboard');
      }
    } catch (err) {
      setError('Wrong email or password!');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Welcome Back!</h2>
        <p>Login to your LocalHero account</p>

        <div style={{ display: 'flex', marginBottom: '20px', borderRadius: '8px', overflow: 'hidden', border: '2px solid #ff6b35' }}>
          <button
            onClick={() => { setLoginType('customer'); setError(''); }}
            style={{ flex: 1, padding: '12px', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold', background: loginType === 'customer' ? '#ff6b35' : 'white', color: loginType === 'customer' ? 'white' : '#ff6b35' }}
          >
            Customer Login
          </button>
          <button
            onClick={() => { setLoginType('worker'); setError(''); }}
            style={{ flex: 1, padding: '12px', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold', background: loginType === 'worker' ? '#ff6b35' : 'white', color: loginType === 'worker' ? 'white' : '#ff6b35' }}
          >
            Worker Login
          </button>
        </div>

        {error && <div className="error-msg">{error}</div>}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>
          {loginType === 'customer' ? 'Login as Customer' : 'Login as Worker'}
        </button>

        <p className="switch-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;