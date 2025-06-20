// components/LeftNavbar.tsx

import { FiMenu } from 'react-icons/fi';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import './LeftNavbar.css';

export default function LeftNavbar() {
  return (
    <nav className="navbar-container">
      <div className="navbar-top"> <FiMenu /> </div>
      <div className="navbar-middle">
        <span className="follow-text">FOLLOW</span>
        <div className="divider-line"></div>
      </div>
      <div className="navbar-bottom">
        <a href="https://www.instagram.com/delta.dubai_/" target="_blank" rel="noopener noreferrer" className="social-icon">
          <FaInstagram />
        </a>
        <a href="https://www.tiktok.com/@delta_dubai" target="_blank" rel="noopener noreferrer" className="social-icon">
          <FaTiktok />
        </a>
      </div>
    </nav>
  );
}