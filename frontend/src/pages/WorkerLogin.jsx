import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function WorkerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/workers/login', { email, password });
      localStorage.setItem('worker', JSON.stringify(res.data.worker));
      navigate('/worker-dashboard');
    } catch (err) {
      setError('Wrong email or password!');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '30px', boxShadow: '0 0 20px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center', color: '#ff6b35' }}>Worker Login</h2>
      <p style={{ textAlign: 'center', color: '#666' }}>LocalHero Worker Portal</p>
      {error && <div style={{ background: '#ffe0e0', color: 'red', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>{error}</div>}
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }}
      />
      <input
        type="password"
        placeholder="Your Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }}
      />
      <button
        onClick={handleLogin}
        style={{ width: '100%', padding: '12px', background: '#ff6b35', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}
      >
        Login as Worker
      </button>
    </div>
  );
}

export default WorkerLogin;