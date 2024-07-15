import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <button className={`navbar-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </button>
      </div>
      <ul className={`navbar-list ${menuOpen ? 'open' : ''}`}>
        <li className="navbar-item">
          <Link to="/" className="navbar-link" onClick={toggleMenu}>Main Page</Link>
        </li>
        <li className="navbar-item">
          <Link to="/buyer" className="navbar-link" onClick={toggleMenu}>New Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/buyer-list" className="navbar-link" onClick={toggleMenu}>Your Ratings</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
