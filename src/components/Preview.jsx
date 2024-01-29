import React, { useState, useEffect } from 'react';
import SelectArea from './SelectArea';
import api from './api';
import './Preview.css';

function Preview(props) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [previewBlob, setPreviewBlob] = useState(null);
  const [filesForSelectArea, setFilesForSelectArea] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const overlayStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: isLoading ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column', 
    textAlign: 'center',
  };

  useEffect(() => {
    setFilesForSelectArea(props.filesForServer);
  }, [props.filesForServer]);

  const fetchPreviewData = async () => {
    const token = localStorage.getItem('token');
    setIsLoading(true); 
    try {
      const response = await api.post(
        '/file/preview',
        {
          fileNameHDR: props.filesForServer.fileNameHDR,
          fileNameIMG: props.filesForServer.fileNameIMG,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          responseType: 'arraybuffer',
        }
      );

      const blob = new Blob([response.data], { type: 'image/png' });
      setPreviewBlob(blob);
      setButtonPopup(true);
    } catch (error) {
      console.error('Error fetching preview data', error);
      alert('Error fetching preview data');
    } finally {
      setIsLoading(false); 
    }
  };

  return (props.trigger) ? (
    <div className="popup-pre">
      <div className="popup-inner-pre">
        <button className="close-btn-pre" onClick={() => props.setTrigger(false)}>x</button>
        {props.children}
  
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#00563B', marginBottom: '10px'}}>Select File Successfully!</h1>
          <h3>Are you ready to see your Preview?</h3>
        </div>
  
        <button
          onClick={fetchPreviewData}
          className="btn-preview"
          style={{
            backgroundColor: '#00563B',
            marginTop: '100px',
            border: 'none',
            color: 'white',
            padding: '15px 32px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            margin: '4px 2px',
            cursor: 'pointer',
            position: 'absolute',
            top: '70%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '10px',
          }}
        >
          Preview
        </button>
      </div>
  
      <SelectArea filesForServer={filesForSelectArea} trigger={buttonPopup} setTrigger={setButtonPopup}>
        {previewBlob && (
          <div>
            <img src={URL.createObjectURL(previewBlob)} alt="Preview" style={{ width: '400px', height: '400px' }} />
          </div>
        )}
      </SelectArea>
      <div style={overlayStyle}>
      {isLoading && 
        <div className='loading-spinner'> 
        </div>
      }
      <p style={{color: 'white', marginTop: '20px', fontSize:'1.5rem'}}>Just a moment...</p>
      </div>
    </div>
  ) : null
  
}

export default Preview;