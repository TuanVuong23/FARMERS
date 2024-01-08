import React, { useState, useEffect } from 'react';

const HistoryPage = () => {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    // Lấy token từ LocalStorage
    const token = localStorage.getItem('token'); // Thay 'yourTokenKey' bằng key của token bạn lưu

    // Gọi API khi component được tạo
    const fetchData = async () => {
      try {
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

    fetchData(); // Gọi hàm fetchData khi component được tạo
  }, []); // [] để đảm bảo useEffect chỉ chạy một lần khi component được tạo

  return (
    <div>
      <h2>History Page</h2>
      {apiData ? (
        <div>
          <h3>Data from API:</h3>
          <pre>{JSON.stringify(apiData, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
      {/* Các phần khác của trang HistoryPage bạn muốn hiển thị */}
    </div>
  );
};

export default HistoryPage;
