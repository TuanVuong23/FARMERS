import React, { useState, useEffect } from 'react';
import Preview from './Preview';
import './SelectFile.css';
import api from './api';

function SelectFile(props) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [fileIds, setFileIds] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [apiFetched, setApiFetched] = useState(false);
  const [filesForServer, setFilesForServer] = useState({
    fileNameHDR: '',
    fileNameIMG: ''
  });

  const handleSelectFile = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You need to Log In first');
      return;
    }

    fetch('http://100.99.67.126:8081/file/get/u', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setFileIds(data);
        setApiFetched(true); 
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  const handleFileClick = (fileName) => {
    const isSelected = selectedFiles.includes(fileName);

    setSelectedFiles(prevSelectedFiles => isSelected
      ? prevSelectedFiles.filter(file => file !== fileName)
      : [...prevSelectedFiles, fileName]
    );
  };

  const handleConfirm = () => {
    const [fileNameHDR, fileNameIMG] = selectedFiles;
    setFilesForServer({
      fileNameHDR,
      fileNameIMG
    });

    setButtonPopup(true);

    if (props.onFilesForServerChange) {
      props.onFilesForServerChange({
        fileNameHDR,
        fileNameIMG
      });
    }
  };

  return props.trigger ? (
    <div className="popup-SF">
      <div className="popup-inner-SF">
        <button className="close-btn-SF" onClick={() => props.setTrigger(false)}></button>
        {props.children}

        {apiFetched ? (
          <button onClick={handleConfirm}>Confirm</button>
        ) : (
          <button className="btnPre" onClick={handleSelectFile}>
            Select File
          </button>
        )}

        {/* Danh sách fileId */}
        <div>
          {fileIds.map((file) => (
            <button
              key={file.fileName}
              onClick={() => handleFileClick(file.fileName)}
              style={{ backgroundColor: selectedFiles.includes(file.fileName) ? 'lightblue' : 'white' }}
            >
              {file.fileName}
            </button>
          ))}
        </div>

        <div>
          <p>Selected Files:</p>
          <ul>
            {selectedFiles.map((fileName) => (
              <li key={fileName}>{fileName}</li>
            ))}
          </ul>
        </div>
      </div>

      <Preview trigger={buttonPopup} setTrigger={setButtonPopup} filesForServer={filesForServer}>
      </Preview>
    </div>
  ) : null;
}

export default SelectFile;
