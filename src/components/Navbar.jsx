import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from './images/logo.png';

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
      <div className='nav-logo'>
        <img src={logo} alt='' />
        <p>Farmers</p> 
      </div>
      <div className={`menu-icon ${isMenuOpen ? "open" : ""}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`nav-menu ${isMenuOpen ? "open" : ""}`}>
        <li onClick={() => setMenu("home")}>
          <Link to="/">Home</Link>
          {menu === "home" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("about")}>
          <Link to="/About">About</Link>
          {menu === "about" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("news")}>
          <Link to="/services">News</Link>
          {menu === "news" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("images")}>
          <Link to="/products">Images</Link>
          {menu === "images" ? <hr /> : <></>}
        </li>
        <li className="login">
        <NavLink to="/sign-up">
          <button>Log In</button>
        </NavLink>
      </li>
      </ul>
     
    </nav>
  );
};

export default Navbar;