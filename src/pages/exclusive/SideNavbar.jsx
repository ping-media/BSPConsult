// import { useState } from "react";
// import "./SideNavbar.css";

// export default function SideNavbar() {
//     const [active, setActive] = useState("profile");

//     const menuItems = [
//         { id: "profile", label: "Profile", icon: "/img/user.svg" },
//         { id: "tips", label: "Tips", icon: "/img/lamp-charge.svg" },
//         { id: "silver", label: "Silvers Video Content", icon: "/img/book.svg" },
//         { id: "master-video", label: "Masterclass Video Content", icon: "/img/video-play.svg" },
//         { id: "master-zone", label: "Masterclass Zone", icon: "/img/search-status.svg" },
//         { id: "subscription", label: "Subscriptions", icon: "/img/crown.svg" },
//     ];

//     const ChevronRight = () => (
//         <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M4.45508 9.95998L7.71508 6.69998C8.10008 6.31498 8.10008 5.68498 7.71508 5.29998L4.45508 2.03998" stroke="white" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
//         </svg>

//     );

//     return (
//         <aside className="side-navbar">
//             {/* Logo */}
//             <div className="nav-header">
//                 <img src="/img/bsplogo.png" alt="BSP Consult" className="logo" />
//                 <p className="company-name">
//                     BSP <span>Consult</span>
//                 </p>
//             </div>

//             <div className="main-container">
//                 <p className="section-title">MAIN</p>

//                 <nav className="nav-menu">
//                     {menuItems.map((item) => (
//                         <button
//                             key={item.id}
//                             type="button"
//                             className={`nav-item ${active === item.id ? "active" : ""}`}
//                             onClick={() => setActive(item.id)}
//                         >
//                             <div className="nav-con">
//                                 <span className="icon">
//                                     <img src={item.icon} alt={item.label} />
//                                 </span>
//                                 {item.label}
//                             </div>
//                             {active === item.id && <ChevronRight />}

//                         </button>
//                     ))}
//                 </nav>
//             </div>

//             <div className="logout-container">
//                 <button type="button" className="logout-btn">
//                     <span className="icon">
//                         <img src="/img/logout.svg" alt="Logout" />
//                     </span>
//                     Logout
//                 </button>
//             </div>

//         </aside>
//     );
// }

/* eslint-disable react/prop-types */
import "./SideNavbar.css";

export default function SideNavbar({ active, onChange, onLogout }) {
  const menuItems = [
    { id: "Profile", label: "Profile", icon: "/img/user.svg" },
    { id: "Setups", label: "Setups", icon: "/img/lamp-charge.svg" },
    { id: "Essential Video Content", label: "Essential Video Content", icon: "/img/book.svg" },
    { id: "BSP Masterclass", label: "BSP Masterclass", icon: "/img/video-play.svg" },
    // { id: "MasterZone", label: "Masterclass Zone", icon: "/img/search-status.svg" },
    { id: "Programs", label: "Programs", icon: "/img/crown.svg" },
  ];

  const ChevronRight = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M4.45508 9.95998L7.71508 6.69998C8.10008 6.31498 8.10008 5.68498 7.71508 5.29998L4.45508 2.03998"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

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
            type="button"
              key={item.id}
              className={`nav-item ${active === item.id ? "active" : ""}`}
              onClick={() => onChange(item.id)}
            >
              <div className="nav-con">
                <span className="icon">
                  <img src={item.icon} alt={item.label} />
                </span>
                {item.label}
              </div>
              {active === item.id && <ChevronRight />}
            </button>
          ))}
        </nav>
      </div>

      <div className="logout-container">
        <button type="button" className="logout-btn" onClick={onLogout}>
          <span className="icon">
            <img src="/img/logout.svg" alt="Logout" />
          </span>
          Logout
        </button>
      </div>
    </aside>
  );
}
