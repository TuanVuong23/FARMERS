import React, { useState, useEffect } from 'react';
import SelectArea from './SelectArea';
import api from './api';

function Preview(props) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [previewBlob, setPreviewBlob] = useState(null);
  const [filesForSelectArea, setFilesForSelectArea] = useState(null);

  useEffect(() => {
    setFilesForSelectArea(props.filesForServer);
  }, [props.filesForServer]);

  const fetchPreviewData = async () => {
    const token = localStorage.getItem('token');
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
      alert('Error fetching preview data');
    }
  };

  return (props.trigger) ? (
    <div className="popup-preview">
      <div className="popup-inner-preview">
        <button className="close-btn-preview" onClick={() => props.setTrigger(false)}></button>
        {props.children}
        <button onClick={fetchPreviewData} className="preview" style={{
          backgroundColor: "#4CAF50", 
          border: "none",
          color: "white",
          padding: "15px 32px",
          textAlign: "center",
          textDecoration: "none",
          display: "inline-block",
          fontSize: "16px",
          margin: "4px 2px",
          cursor: "pointer",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
      }}>Preview</button>
      </div>

      <SelectArea filesForServer={filesForSelectArea} trigger={buttonPopup} setTrigger={setButtonPopup}>
        {previewBlob && (
          <div>
            {/* Hiển thị hình ảnh từ Blob */}
            <img src={URL.createObjectURL(previewBlob)} alt="Preview" style={{ maxWidth: '100%', height: '100%' }} />
          </div>
        )}
      </SelectArea>
    </div>
  ) : null;
}

export default Preview;
