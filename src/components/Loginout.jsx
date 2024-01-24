// App.js

import React, { useState } from 'react';
import AuthForm from './AuthForm';
import Navbar from './Navbar';

const Loginout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <AuthForm isLoggedIn={isLoggedIn} onLogin={handleLogin} />
    </div>
  );
};

export default Loginout;
