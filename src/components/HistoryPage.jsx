import React, { useState, useEffect } from 'react';
import './HistoryPage.jsx';

const HistoryPage = () => {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://100.99.67.126:8081/file/get/u', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching data from the API');
      }

      const responseData = await response.json();
      setApiData(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleButtonClick = (item) => {
    console.log('Button clicked:', item);
    // Xử lý khi nút được bấm, có thể hiển thị thông tin chi tiết hoặc thực hiện các tác vụ khác
  };

  const renderData = () => {
    return (
      <div>
        <h3>Data from API:</h3>
        <ul>
          {apiData.map((item, index) => (
            <li key={index}>
              <button onClick={() => handleButtonClick(item)}>
                {item.fileName} - {item.uploadDateTime}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h2>History Page</h2>
      {apiData ? renderData() : <p>Loading data...</p>}
      {/* Các phần khác của trang HistoryPage bạn muốn hiển thị */}
    </div>
  );
};

export default HistoryPage;
