
import React, { useState } from 'react';
import "./Preview.css";
import SelectArea from "./SelectArea";
import api from './api';

function Preview(props) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [previewBlob, setPreviewBlob] = useState(null);

  const fetchPreviewData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await api.post(
        '/file/preview', 
        {
          "fileNameHDR": "hyper_20220326_3cm.hdr",
          "fileNameIMG": "hyper_20220326_3cm.img"
        },
        {
          headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
          },
          responseType: 'arraybuffer', // 
        }
      );

      const blob = new Blob([response.data], { type: 'image/png' });
      setPreviewBlob(blob);
      setButtonPopup(true);
    } catch (error) {
      alert('Error fetching preview data');
    }
  }

  return (props.trigger) ? (
    <div className="popup-preview">
      <div className="popup-inner-preview">
        <button className="close-btn-preview" onClick={() => props.setTrigger(false)}></button>
        {props.children}
        <button onClick={() =>{ fetchPreviewData(); setButtonPopup(true) }} className="preview">Preview</button>
      </div>

      <SelectArea trigger={buttonPopup} setTrigger={setButtonPopup}>
        {previewBlob && (
          <div>
            
            {/* Hiển thị hình ảnh từ Blob */}
            <img src={URL.createObjectURL(previewBlob)} alt="Preview" style={{ maxWidth: '100%', height: '100%' }} />
          </div>
        )}
      </SelectArea>
    </div>
  ) : "";
}

export default Preview;
