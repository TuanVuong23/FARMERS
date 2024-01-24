import React, { useState, useEffect } from 'react';

const HistoryPage = () => {
  const [apiData, setApiData] = useState(null);
  const [selectedFileData, setSelectedFileData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://100.99.67.126:8082/file/get/u', {
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

  const fetchFileDetails = async (fileID) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://100.99.67.126:8081/file/get/u/${fileID}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching file details from the API');
      }

      const fileDetails = await response.json();
      setSelectedFileData(fileDetails);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleButtonClick = (item) => {
    console.log('Button clicked:', item);
    fetchFileDetails(item.fileID); 
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

  const renderFileDetails = () => {
    if (selectedFileData) {
      return (
        <div>
          <h3>Selected File Details:</h3>
          <p>File Name: {selectedFileData.fileName}</p>
          <p>Upload Date Time: {selectedFileData.uploadDateTime}</p>
          
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h2>History Page</h2>
      {apiData ? renderData() : <p>Loading data...</p>}
      {selectedFileData && renderFileDetails()}
     
    </div>
  );
};

export default HistoryPage;
