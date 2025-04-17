import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      onLogin(user);
      navigate(user.role === 'admin' ? '/admin' : '/user');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/login-bg.jpg')] bg-cover bg-center fade-in">
      <div className="card bg-white bg-opacity-90 p-8 rounded-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Login</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>
          <button
            onClick={handleLogin}
            className="btn-primary w-full"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;