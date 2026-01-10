import { useState } from "react";
import "./SideNavbar.css";

export default function SideNavbar() {
  const [active, setActive] = useState("profile"); // ✅ default active

  const menuItems = [
    { id: "profile", label: "Profile", icon: "/img/user.svg" },
    { id: "tips", label: "Tips", icon: "/img/lamp-charge.svg" },
    { id: "silver", label: "Silvers Video Content", icon: "/img/book.svg" },
    { id: "master-video", label: "Masterclass Video Content", icon: "/img/video-play.svg" },
    { id: "master-zone", label: "Masterclass Zone", icon: "/img/search-status.svg" },
    { id: "subscription", label: "Subscriptions", icon: "/img/crown.svg" },
  ];

  return (
    <aside className="side-navbar">
      {/* Logo */}
      <div className="nav-header">
        <img src="/img/bsplogo.png" alt="BSP Consult" className="logo" />
        <p className="company-name">
          BSP <span>Consult</span>
        </p>
      </div>

      <div className="main-container">
        <p className="section-title">MAIN</p>

        <nav className="nav-menu">
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-item ${active === item.id ? "active" : ""}`}
              onClick={() => setActive(item.id)}
            >
              <span className="icon">
                <img src={item.icon} alt={item.label} />
              </span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <button type="button" className="logout-btn">
        <span className="icon">
          <img src="/img/logout.svg" alt="Logout" />
        </span>
        Logout
      </button>
    </aside>
  );
}
