import React from 'react';
import '../styles/Profile.css';

export default function Profile() {
  // Fetch user info from localStorage (or from backend if available)
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Guest', email: 'guest@example.com' };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-card">
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        {/* You can add more info like profile picture, tasks count etc */}
      </div>
    </div>
  );
}