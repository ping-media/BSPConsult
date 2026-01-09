import React from "react";
import "./profile-settings.css";

export default function ProfileSettings() {
  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">BSP <span>CONSULT</span></div>

        <nav>
          <p className="menu-title">MAIN</p>
          <ul>
            <li className="active">Profile</li>
            <li>Setups</li>
            <li>Essential Video Content</li>
            <li>BSP Masterclass Course</li>
            <li>Programs</li>
          </ul>
        </nav>

        <div className="logout">Logout</div>
      </aside>

      {/* CONTENT */}
      <main className="content">
        <h1 className="page-title">Choose Your Program</h1>

        <div className="settings-wrapper">
          {/* LEFT SETTINGS */}
          <div className="settings-menu">
            <button type="button" className="menu-btn active">Profile Settings</button>
            <button type="button" className="menu-btn">Change Password</button>
            <button type="button" className="menu-btn">Subscription</button>
            <button type="button" className="menu-btn">Free Training</button>
            <button type="button" className="menu-btn">Contact Us</button>
            <button type="button" className="menu-btn">Logout</button>
          </div>

          {/* RIGHT PANEL */}
          <div className="settings-panel">
            <h2>Profile Settings</h2>
            <p className="subtitle">
              Manage your personal details like name, email, and contact number
              to your profile up to date.
            </p>

            <div className="profile-image">
              <img
                src="https://i.pravatar.cc/100"
                alt="profile"
              />
              <div>
                <p className="image-info">400px, JPG or PNG, max 200kb</p>
                <button type="button" className="upload-btn">Upload Image</button>
              </div>
            </div>

            <div className="form">
              <div className="form-row">
                <input placeholder="Robert" />
                <input placeholder="Smith" />
              </div>
              <input placeholder="hello@alignui.com" />
            </div>

            <div className="actions">
              <button type="button" className="cancel">Cancel</button>
              <button type="button"className="save">Save</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
