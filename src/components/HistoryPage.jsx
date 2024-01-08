import React, { useEffect, useState } from 'react';

function HistoryPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('your-token-key'); // replace 'your-token-key' with your actual key

    fetch('http://100.99.67.126:8081/file/get/u', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {data ? JSON.stringify(data) : 'Loading...'}
    </div>
  );
}

export default HistoryPage;