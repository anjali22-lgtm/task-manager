import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // For mobile toggle

  // Persist dark mode across reloads
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    if (savedMode) document.body.classList.add('dark-mode');
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
    document.body.classList.toggle('dark-mode');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>
          Home
        </NavLink>
        {/* Dashboard removed for simplicity */}
        {token && (
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
            Profile
          </NavLink>
        )}
      </div>

      <div className={`nav-right ${menuOpen ? 'open' : ''}`}>
        {/* Dark Mode Toggle */}
        <button className="dark-btn" onClick={toggleDarkMode}>
          {darkMode ? '☀ Light' : '🌙 Dark'}
        </button>

        {!token ? (
          <>
            <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>
              Login
            </NavLink>
            <NavLink to="/register" className={({ isActive }) => isActive ? 'active' : ''}>
              Register
            </NavLink>
          </>
        ) : (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>

      {/* Hamburger menu for mobile */}
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
    </nav>
  );
}