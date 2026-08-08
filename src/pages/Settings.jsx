import { useState } from "react";
import "../styles/Dashboard.css";

function Settings() {
  const savedProfile = JSON.parse(
    localStorage.getItem("farmerProfile") || "null"
  );

  const savedSettings = JSON.parse(
    localStorage.getItem("farmerSettings") || "null"
  );

  const [settings, setSettings] = useState(
    savedSettings || {
      emailNotifications: true,
      language: "English",
      currency: "NGN (₦)",
    }
  );

  const [saved, setSaved] = useState(false);

  const accountName =
    savedProfile?.name?.trim() || "New Farmer";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings((previousSettings) => ({
      ...previousSettings,
      [name]: type === "checkbox" ? checked : value,
    }));

    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(
      "farmerSettings",
      JSON.stringify(settings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <main className="main-content">

      {/* Page Header */}
      <div className="welcome-section settings-welcome">
        <h1>Settings</h1>

        <p>
          Manage your account preferences and personalize
          your Ubani experience.
        </p>
      </div>

      {/* Settings Card */}
      <div className="recent-activities settings-card">

        <div className="section-header">
          <div>
            <h2>Account Settings</h2>

            <p>
              Customize your account, notifications,
              language and currency.
            </p>
          </div>
        </div>

        {/* Account Name */}
        <div className="setting-field">
          <div className="setting-info">
            <strong>Account Name</strong>

            <p>
              Your current farmer account name.
            </p>
          </div>

          <span className="account-name">
            {accountName}
          </span>
        </div>

        {/* Email Notifications */}
        <div className="setting-field">
          <div className="setting-info">
            <strong>Email Notifications</strong>

            <p>
              Receive updates and notifications about
              your farm activities.
            </p>
          </div>

          <label className="toggle">
            <input
              type="checkbox"
              name="emailNotifications"
              checked={settings.emailNotifications}
              onChange={handleChange}
            />

            <span className="toggle-slider"></span>
          </label>
        </div>

        {/* Language */}
        <div className="setting-field">
          <div className="setting-info">
            <strong>Language</strong>

            <p>
              Select your preferred language.
            </p>
          </div>

          <select
            name="language"
            value={settings.language}
            onChange={handleChange}
            className="settings-select"
          >
            <option value="English">
              English
            </option>

            <option value="French">
              French
            </option>

            <option value="Spanish">
              Spanish
            </option>

            <option value="Portuguese">
              Portuguese
            </option>

            <option value="Arabic">
              Arabic
            </option>

            <option value="Hausa">
              Hausa
            </option>

            <option value="Igbo">
              Igbo
            </option>

            <option value="Yoruba">
              Yoruba
            </option>
          </select>
        </div>

        {/* Currency */}
        <div className="setting-field">
          <div className="setting-info">
            <strong>Currency</strong>

            <p>
              Select the currency used for your farm.
            </p>
          </div>

          <select
            name="currency"
            value={settings.currency}
            onChange={handleChange}
            className="settings-select"
          >
            <option value="NGN (₦)">
              NGN (₦)
            </option>

            <option value="USD ($)">
              USD ($)
            </option>

            <option value="GBP (£)">
              GBP (£)
            </option>

            <option value="EUR (€)">
              EUR (€)
            </option>

            <option value="GHS (₵)">
              GHS (₵)
            </option>

            <option value="KES (KSh)">
              KES (KSh)
            </option>
          </select>
        </div>

        {/* Save Section */}
        <div className="settings-actions">

          <button
            className="add-btn settings-save-btn"
            onClick={handleSave}
          >
            Save Changes
          </button>

          {saved && (
            <span className="success-message">
              ✓ Settings saved successfully
            </span>
          )}

        </div>

      </div>

    </main>
  );
}

export default Settings;