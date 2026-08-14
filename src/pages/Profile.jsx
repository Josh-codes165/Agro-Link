import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import '../styles/Dashboard.css';

function Profile() {
  const getSavedProfile = () => {
    try {
      const saved = localStorage.getItem('farmerProfile');
      if (saved) return JSON.parse(saved);
    } catch (error) {
      console.error('Error loading profile:', error);
    }
    return { name: '', farm: '', location: '', role: 'Farmer' };
  };

  const [profile, setProfile] = useState(getSavedProfile);
  const [formData, setFormData] = useState(getSavedProfile);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleEdit = () => {
    setFormData({ ...profile });
    setEditing(true);
    setSaved(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSave = () => {
    const updatedProfile = {
      name: formData.name.trim(),
      farm: formData.farm.trim(),
      location: formData.location.trim(),
      role: formData.role.trim() || 'Farmer',
    };

    setProfile(updatedProfile);
    localStorage.setItem('farmerProfile', JSON.stringify(updatedProfile));

    if (updatedProfile.name) {
      localStorage.setItem('farmerName', updatedProfile.name);
    } else {
      localStorage.removeItem('farmerName');
    }

    setFormData(updatedProfile);
    setEditing(false);
    setSaved(true);
  };

  const handleCancel = () => {
    setFormData({ ...profile });
    setEditing(false);
    setSaved(false);
  };

  return (
    <DashboardLayout>
      <div className="dashboard">
        <div className="main-content">
          <div className="profile-page">
            <div className="profile-header">
              <div>
                <h1>My Profile</h1>
                <p>Manage your personal and farm information.</p>
              </div>

              {!editing && (
                <button
                  type="button"
                  className="profile-edit-btn"
                  onClick={handleEdit}>
                  Edit Profile
                </button>
              )}
            </div>

            <div className="profile-main-card">
              <div className="profile-intro">
                <div className="profile-avatar">
                  {profile.name ? profile.name.charAt(0).toUpperCase() : 'F'}
                </div>
                <div>
                  <h2>{profile.name || 'Farmer'}</h2>
                  <p>{profile.role || 'Farmer'}</p>
                  {profile.location && (
                    <span className="profile-location">
                      📍 {profile.location}
                    </span>
                  )}
                </div>
              </div>

              <div className="profile-divider"></div>

              <div className="profile-section-title">
                <h3>Personal & Farm Information</h3>
                <p>Keep your information up to date.</p>
              </div>

              {editing ? (
                <div className="profile-form">
                  <div className="profile-field">
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="profile-field">
                    <label htmlFor="farm">Farm Name</label>
                    <input
                      id="farm"
                      type="text"
                      name="farm"
                      value={formData.farm}
                      onChange={handleChange}
                      placeholder="Enter your farm name"
                    />
                  </div>

                  <div className="profile-field">
                    <label htmlFor="location">Location</label>
                    <input
                      id="location"
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Owerri, Imo State"
                    />
                  </div>

                  <div className="profile-field">
                    <label htmlFor="role">Role</label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}>
                      <option value="Farmer">Farmer</option>
                      <option value="Farm Manager">Farm Manager</option>
                      <option value="Agricultural Business Owner">
                        Agricultural Business Owner
                      </option>
                    </select>
                  </div>

                  <div className="profile-actions">
                    <button
                      type="button"
                      className="save-profile-btn"
                      onClick={handleSave}>
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="cancel-profile-btn"
                      onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="profile-details">
                  <div className="profile-detail">
                    <span>Full Name</span>
                    <strong>{profile.name || 'Not set'}</strong>
                  </div>
                  <div className="profile-detail">
                    <span>Farm Name</span>
                    <strong>{profile.farm || 'Not set'}</strong>
                  </div>
                  <div className="profile-detail">
                    <span>Location</span>
                    <strong>{profile.location || 'Not set'}</strong>
                  </div>
                  <div className="profile-detail">
                    <span>Role</span>
                    <strong>{profile.role || 'Farmer'}</strong>
                  </div>
                </div>
              )}

              {saved && !editing && (
                <div className="profile-success">
                  ✓ Profile updated successfully.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;
