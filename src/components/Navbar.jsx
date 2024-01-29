import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from './images/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Bạn có chắc chắn muốn đăng xuất?');
    if (confirmLogout) {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      toast.success('Đăng xuất thành công!', { position: "top-right", autoClose: 3000 });
    }
  };

  return (
    <div>
      <ToastContainer />
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
          {isLoggedIn ? (
            <li className="login" onClick={handleLogout}>
              <button>Log Out</button>
            </li>
          ) : (
            <li className="login">
              <NavLink to="/sign-up">
                <button>Sign In</button>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
