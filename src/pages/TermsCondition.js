import React from "react";
import "./TermsCondition.css";
import '../components/landing-page/css/Header.css';

export default function TermsCondition() {
   

    return (
        <>
         <div className="navbar">
  <div className="navbar-inner">
    <div className="brand">
      <a href="https://bspconsult.com/" className="brand-link">
        <img src="img/bsplogo.png" alt="BSP Consult" className="brand-logo" />
        <span className="brand-text">
          <strong>BSP</strong> CONSULT
        </span>
      </a>
    </div>

    <div className="login">
      <a href="https://app.bspconsult.com/login" className="btn-white">
        Login
        <img src="img/loginLogo.svg" alt="" className="btn-icon" />
      </a>
    </div>
  </div>
</div>
     <div className="terms-condition ">
        <h1 className="terms-heading">Terms and Conditions</h1>
        <div className="terms-content">
            <div className="terms-main">
          <p>ARTICLE 1 – DEFINITIONS AND SCOPE OF APPLICATION OF THE GENERAL TERMS AND CONDITIONS</p>
          <p className="T-Heading">1.1. In these General Terms and Conditions the undergoing terms are defined as follows:</p> 
          <p className="T-Answer">“The Company”: BSP Consult, a company registered in accordance with the laws of the Netherlands, having its registered office at Herengracht 466, 1017 CA Amsterdam, The Netherlands, registered with the Chamber of Commerce under number 75227309.</p>
          <p className="T-Answer">Any type of content or material that is uploaded to or posted on the Platform by The Company, including images, videos, text elements, audio elements, GIFs/memes and any other type of content or material in whatever way or form.</p>
     </div>
     </div>
        </div>
     </>
    );
   
}
