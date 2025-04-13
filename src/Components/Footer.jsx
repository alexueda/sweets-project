// src/components/Footer.jsx
import React from 'react';
import '../css/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h3 className="contact-us">Contact Us</h3>
        <div className="contact-info">(123) 875-6490</div>
      </div>
      <div className="footer-right">
        <div className="slogan">Find Your New Favorite Treat</div>
      </div>
    </footer>
  );
}

export default Footer;
