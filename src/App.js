import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Navbar from './components/Navbar';

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [role, setRole] = useState(user ? user.role : null);

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setRole(userData.role);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setRole(null);
  };

  return (
    <Router>
      <Navbar user={user} role={role} handleLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to={role === 'admin' ? '/admin' : '/user'} />} />
        <Route path="/signup" element={!user ? <Signup onSignup={handleLogin} /> : <Navigate to={role === 'admin' ? '/admin' : '/user'} />} />
        <Route path="/admin" element={user && role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/user" element={user && role === 'user' ? <UserDashboard /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;