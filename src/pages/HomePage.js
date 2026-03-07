import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

export default function HomePage() {
  return (
    <div className="homepage-container">

      {/* Header with logo and nav */}
      <header className="homepage-header">
        <h1 className="logo">Task Manager</h1>
        <nav className="homepage-nav">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </nav>
      </header>
      {/* Hero Section */}
<section className="hero">
  <h2>Stay Organized. Stay Productive.</h2>
  <p>Manage your tasks, track progress, and collaborate with ease.</p>
  <div className="hero-buttons">
    {/* Changed to /login instead of /register */}
    <Link to="/login" className="btn btn-secondary">Get Started</Link>
  </div>
</section>

 
      {/* Features Section */}
      <section className="features">
        <h3>Features</h3>
        <div className="feature-cards">
          <div className="feature-card">
            <h4>Add Tasks</h4>
            <p>Create tasks with priority, due date, and status.</p>
          </div>
          <div className="feature-card">
            <h4>Track Progress</h4>
            <p>See your tasks by Pending, In Progress, and Completed.</p>
          </div>
          <div className="feature-card">
            <h4>Comments & Notes</h4>
            <p>Collaborate by adding comments to your tasks.</p>
          </div>
          <div className="feature-card">
            <h4>Dark Mode</h4>
            <p>Switch between light and dark mode for comfortable viewing.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="homepage-footer">
        <p>© 2026 Task Manager. All rights reserved.</p>
      </footer>

    </div>
  );
}