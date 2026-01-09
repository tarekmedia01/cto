import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          University Resources
        </Link>

        <div className="navbar-menu">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/resources" className="navbar-link">
            Resources
          </Link>
          <Link to="/calendar" className="navbar-link">
            Calendar
          </Link>
          {user.role === 'admin' && (
            <Link to="/admin" className="navbar-link">
              Admin
            </Link>
          )}
          <Link to="/notifications" className="navbar-link">
            Notifications
            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
          </Link>
          
          <div className="navbar-user">
            <button
              className="user-button"
              onClick={() => setShowMenu(!showMenu)}
            >
              {user.firstName} {user.lastName}
            </button>
            {showMenu && (
              <div className="user-menu">
                <Link to="/profile" className="user-menu-item">
                  Profile
                </Link>
                <button onClick={handleLogout} className="user-menu-item">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
