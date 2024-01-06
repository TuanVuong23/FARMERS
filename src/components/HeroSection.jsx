import React, { useState } from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
  const [apiData, setApiData] = useState(null);
  const [showHistoryPage, setShowHistoryPage] = useState(false);

  const handleHistoryClick = () => {
    // Lấy token từ local storage
    const token = localStorage.getItem('token');

    // Kiểm tra xem token có tồn tại không
    if (token) {
      console.log('Token:', token);

      // Thực hiện yêu cầu API
      fetch('http://100.99.67.126:8081/file/get/u', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Thêm các headers khác nếu cần
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('API Response:', data);
        setApiData(data);
        setShowHistoryPage(true);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  };

  return (
    <div className='hero-container'>
      {/*<video src='/videos/video-1.mp4' autoPlay loop muted />*/}
      <h1>NPK Detective</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          
          INSERT NOW
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={handleHistoryClick}
          to='/services'
        >
          HISTORY 
        </Button>
      </div>
      
      {showHistoryPage && (
        <div>
          <h2>HISTORY PAGE</h2>
          {apiData && apiData.map(file => (
            <p key={file.id}>{file.fileId}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default HeroSection;