import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
<footer className="footer">
  <div className="footer-inner">
    <p>© 2025 Wellness Rounds NC. All rights reserved.</p>
    <div className="footer-links">
      <a href="/privacy">Privacy Policy</a> |  
      <a href="/terms">Terms of Service</a> |  
      <a href='/contact'>Contact Us</a>
    </div>
    <p className="footer-social">
      <a href="https://facebook.com" target="_blank">Facebook</a> | 
      <a href="https://twitter.com" target="_blank">Twitter</a> | 
      <a href="https://instagram.com" target="_blank">Instagram</a>
    </p>
  </div>
</footer>

  );
};

export default Footer;
