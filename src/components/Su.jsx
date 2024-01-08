import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';
import api from './api';

const AuthForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        const responseSignUp = await api.post('/user/register', {
          username,
          password,
        });
        console.log(responseSignUp.data);
      } else {
        const responseSignIn = await api.post('/user/login', {
          username,
          password,
        });
        console.log(responseSignIn.data);
        const userToken = responseSignIn?.data?.token;

        localStorage.setItem('token', userToken);
        setToken(userToken);
        setIsLoggedIn(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error('Tên người dùng đã tồn tại. Vui lòng chọn một tên khác.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      } else {
        toast.error('Tên đăng nhập hoặc mật khẩu sai', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
        console.error(error);
      }
    }
  };

  const toggleForm = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Bạn có chắc chắn muốn đăng xuất?');
    if (confirmLogout) {
      localStorage.removeItem('token');
      setToken(null);
      setIsLoggedIn(false);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className="success-message">
          <p>Bạn đã đăng nhập thành công!</p>
          <div className="arrow-link" onClick={() => window.location.href = '/'}>
            <span>&#8594;</span> Trang chủ
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
      ) : (
        <div className={`auth-form-container ${isSignUp ? 'sign-up' : 'sign-in'}`}>
          <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <button className="auth-button" onClick={handleAuth}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
          <br />
          <p onClick={toggleForm} className="toggle-form-link">
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </p>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default AuthForm;
