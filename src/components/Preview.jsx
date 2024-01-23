
import React, { useState } from 'react';
import "./Preview.css";
import Predict from "./Predict";
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
          "img_path": "D:\\img\\hyper_20220326_3cm.img",
          "hdr_path": "D:\\img\\hyper_20220326_3cm.hdr",
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
      console.error('Error fetching preview data:', error);
    }
  }

  return (props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}></button>
        {props.children}
        <button onClick={() => fetchPreviewData()} className="preview">Preview</button>
      </div>

      <Predict trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h2>Here is your Preview picture</h2>
        {previewBlob && (
          <div>
            {/* Hiển thị hình ảnh từ Blob */}
            <img src={URL.createObjectURL(previewBlob)} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        )}
      </Predict>
    </div>
  ) : "";
}

export default Preview;
