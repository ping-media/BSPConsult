import React from "react";
import "./profile-settings.css";
import SideNavbar from "./SideNavbar";

export default function ProfileSettings() {
  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <SideNavbar />

      {/* PAGE CONTENT */}
      <div className="dashboard-content">
        <h1>Profile Settings</h1>
      </div>
    </div>
  );
}
