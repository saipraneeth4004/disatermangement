import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = ({ onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.email === email)) {
      setError('Email already exists');
      return;
    }
    const newUser = { email, password, role: email === 'admin@example.com' ? 'admin' : role };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    onSignup(newUser);
    navigate(newUser.role === 'admin' ? '/admin' : '/user');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/signup-bg.jpg')] bg-cover bg-center fade-in">
      <div className="card bg-white bg-opacity-90 p-8 rounded-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Signup</h2>
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
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="user">User</option>
              <option value="admin">Admin (use admin@example.com)</option>
            </select>
          </div>
          <button
            onClick={handleSignup}
            className="btn-primary w-full"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;