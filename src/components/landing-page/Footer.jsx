import React from 'react';
import './css/Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-gradient" />

    <div className="footer-container">
      {/* Left */}
      <div className="footer-left">
        <div className="footer-logo">
          <img src="/img/logo-icon.svg" alt="BSP Consult" />
          {/* <span>BSP CONSULT</span> */}
        </div>

        <p className="footer-desc">
          BSP CONSULT – We build high-level bettors.
        </p>

        <h4 className="footer-title">Get BSP Insights</h4>

        <div className="footer-subscribe">
          <input type="email" placeholder="Enter your email" />
          <button type="button">
            Subscribe
            <img src="/img/viewbtn.svg" alt="arrow" />
          </button>
        </div>
      </div>

      {/* Middle */}
      <div className="footer-links">
        <h4>Company</h4>
        <ul>
          <li><a href="https://www.instagram.com/bspconsult/">Instagram</a></li>
          <li><a href="#">Terms & Conditions</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </div>

      {/* Right */}
      <div className="footer-apps">
        <h4>Apps</h4>
        <a
          href="https://play.google.com/store/apps/details?id=com.istarii.bsppronos&pcampaignid=web_share"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/img/gp.svg" alt="Google Play" width={145} height={50} />
        </a>
        <a
          href="https://apps.apple.com/us/app/bsp-consult/id1531281216"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/img/ap.svg" alt="App Store" width={145} height={50} />
        </a>
      </div>
      </div>
    <div className="footer-bottom">
      © 2026 BSP Consult. All rights reserved.
    </div>
  </footer>
);

export default Footer;
