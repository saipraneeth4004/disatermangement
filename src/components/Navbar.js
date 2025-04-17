import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, role, handleLogout }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight hover:text-blue-200 transition-colors">Disaster Management</Link>
        <div className="space-x-6">
          {user ? (
            <>
              {role === 'admin' && <Link to="/admin" className="text-lg hover:text-blue-200 transition-colors">Admin Dashboard</Link>}
              {role === 'user' && <Link to="/user" className="text-lg hover:text-blue-200 transition-colors">User Dashboard</Link>}
              <button onClick={onLogout} className="btn-secondary text-lg">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-lg hover:text-blue-200 transition-colors">Login</Link>
              <Link to="/signup" className="text-lg hover:text-blue-200 transition-colors">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;