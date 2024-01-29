import React, { useState, useEffect } from 'react';
import Preview from './Preview.jsx';
import SelectArea from './SelectArea.jsx';

const HistoryPage = () => {
  const [apiData, setApiData] = useState(null);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filesForServer, setFilesForServer] = useState({
    fileNameHDR: '',
    fileNameIMG: '',
  });

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
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching data from the API');
      }

      const responseData = await response.json();
      setApiData(responseData);
    } catch (error) {
      console.error('Error:', error);
      console.log('filesForServer');
    } 
  };

  const handleFileClick = (file) => {
    const isSelected = selectedFiles.includes(file);

    setSelectedFiles((prevSelectedFiles) =>
      isSelected
        ? prevSelectedFiles.filter((selectedFile) => selectedFile !== file)
        : [...prevSelectedFiles, file]
    );
  };

  const handleConfirm = () => {
    if (selectedFiles.length === 2) {
      const [fileNameHDR, fileNameIMG] = selectedFiles.map((file) => file.fileName);
      setFilesForServer({
        fileNameHDR,
        fileNameIMG,
      });
      setButtonPopup(true);
    } else {
      console.error('Please select exactly 2 files.');
    }
  };

  const renderData = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          border: '2px solid green', // Border width
          borderRadius: '20px',
          padding: '20px 300px', // Increase the padding as needed on both sides
        }}
      >
        <ul style={{ listStyle: 'none', padding: 0, textAlign: 'center' }}>
          {apiData.map((file, index) => (
            <li
              key={index}
              style={{
                margin: '10px',
                backgroundColor: selectedFiles.includes(file) ? 'lightblue' : 'white',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ marginRight: 'auto', marginLeft: '20px' }}>
                {file.fileName} - {file.uploadDateTime}
              </div>
              <label style={{ marginLeft: '20px', marginRight: '20px' }}>
                <input
                  type="checkbox"
                  checked={selectedFiles.includes(file)}
                  onChange={() => handleFileClick(file)}
                  style={{ transform: 'scale(1.5)' }}
                />
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

  
  
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', background: 'white' }}>HISTORY PAGE</h1>
      {apiData ? renderData() : <p>Loading data...</p>}

      <div>
      <button
  style={{
    marginTop: '40px', // Increase this from 20px to 40px
    display: 'block', 
    margin: '0 auto', 
    padding: '12px 25px',
    backgroundColor: '#00563B', 
    color: 'white', 
    fontSize: '18px', 
    border: 'none', 
    borderRadius: '10px', 
    cursor: 'pointer', 
    transition: 'background-color 0.3s, box-shadow 0.2s', 
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)', 
    fontFamily: "'Roboto', sans-serif", 
  }}
  onClick={handleConfirm}
>
  Confirm
</button>
        
      </div>
      <Preview trigger={buttonPopup} setTrigger={setButtonPopup} filesForServer={filesForServer}>
      </Preview>
      <SelectArea filesForServer={filesForServer} />
    </div>
  );
};

export default HistoryPage;
