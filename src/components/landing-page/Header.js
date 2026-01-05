import { Play, CircleCheckBig} from 'lucide-react';
import { paths } from 'src/routes/paths';
import WistiaPlayer from './WistiaPlayer';
import './css/Header.css';


const Header = () => (
  <header className="pb-65 relative index">
 <div className="navbar">
  <div className="navbar-inner">
    <div className="brand">
      <a href="https://bspconsult.com/" className="brand-link">
        <img src="img/logo.webp" alt="BSP Consult" className="brand-logo" />
        <span className="brand-text">
          <strong>BSP</strong> CONSULT
        </span>
      </a>
    </div>

    <div className="login">
      <a href="https://app.bspconsult.com/login" className="btn-white">
        Login
        <img src="img/loginLogo.png" alt="" className="btn-icon" />
      </a>
    </div>
  </div>
</div>


    <div className="bg-effect" />
   
    <div className="container pl-5 pr-5 pt-65 d-flex flex-column xs-pl-8 xs-pr-8">
    <div className="hero-badge-wrapper">
  <div className="hero-badge">
    <span className="hero-badge-tag">Proven</span>
    <span className="hero-badge-text">ATP Tennis Betting System</span>
  </div>
</div>

      <h1 className="heading-h1 text-center">
        Step-by-Step Method Built for Elite Tennis <br />
        Betting That Explains <span>How Money Flows</span> to <br />
       Structured Bettors
      </h1>
      <div className="watch-video-text">
  <Play className="play-icon" />
  <span>Watch the 8-minute video to understand how it actually works</span>
  </div>
      <WistiaPlayer videoId="s9dfisq9e7" wrapper="wistia-player-container-1" />

<div className="features-list">
  <div className="feature-item">
    <span className="feature-icon">
      <CircleCheckBig size={14} />
    </span>
    <span>4+ Years Proven Track Record</span>
  </div>

  <div className="feature-item">
    <span className="feature-icon">
      <CircleCheckBig size={14} />
    </span>
    <span>Single Sport Focus</span>
  </div>

  <div className="feature-item">
    <span className="feature-icon">
      <CircleCheckBig size={14} />
    </span>
    <span>Selective Bets Only</span>
  </div>

  <div className="feature-item">
    <span className="feature-icon">
      <CircleCheckBig size={14} />
    </span>
    <span>ROI Driven Strategy</span>
  </div>
</div>

     <div className="cta-wrapper">
  <a href="#SectionPrice" className="cta-gradient-btn">
    <span className="cta-text">View the Programs</span>
    <img
      src="img/viewbtn.png"   
      alt=""
      className="cta-icon"
    />
  </a>

  <div className="cta-rating">
    <div className="stars">
       <span className="star full">★</span>
    <span className="star full">★</span>
    <span className="star full">★</span>
    <span className="star full">★</span>

    {/* last star = 80% filled */}
    <span className="star partial">
      ★
      <span className="star-fill">★</span>
    </span>
    </div>
    <div className="rating-text">
      <strong>4.8</strong> | 487 Reviews
    </div>
  </div>
</div>

    </div>
  </header>
);
export default Header;
