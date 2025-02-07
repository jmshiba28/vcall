import React, { useState, useEffect } from 'react';
import './ProfilePage.css';

const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1234567890',
  bio: 'Passionate developer & tech enthusiast.',
  avatar: 'https://via.placeholder.com/150',
};

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUser(mockUser);
      setFormData(mockUser);
    }, 500);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = () => {
    console.log('Saved data:', formData);
    setUser(formData);
    setIsEditing(false);
  };

  if (!user) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <img src={user.avatar} alt="Profile Avatar" className="avatar" />
        <h2>{user.name}</h2>
        <p>{user.bio}</p>

        <div className="profile-info">
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          ) : (
            <p>{user.email}</p>
          )}

          <label>Phone:</label>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          ) : (
            <p>{user.phone}</p>
          )}
        </div>

        <div className="actions">
          {isEditing ? (
            <>
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={handleEditToggle}>Cancel</button>
            </>
          ) : (
            <button className="edit-btn" onClick={handleEditToggle}>Edit Profile</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
