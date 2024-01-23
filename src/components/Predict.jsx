import React, { useState } from 'react'
import "./Predict.css"
import Result from './Result'
import api from './api';

function Predict(props) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [previewBlob, setPreviewBlob] = useState(null);

  const fetchPreviewData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await api.post(
        '/file/predict', 
        {
          "img_path": "D:\\img\\hyper_20220326_3cm.img",
          "hdr_path": "D:\\img\\hyper_20220326_3cm.hdr",
          "x": "4000",
          "y": "4000"
        },
        {
          headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
          },
          responseType: 'arraybuffer', // Sử dụng responseType để nhận ArrayBuffer từ axios
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
    <div className="popup-predict">
      <div className="popup-inner-predict">
        <button className="close-btn-predict" onClick={() => props.setTrigger(false)}></button>
        { props.children }
        <input type="text" placeholder="Enter X" value={x} onChange={(e) => setX(e.target.value)} />
        <input type="text" placeholder="Enter Y" value={y} onChange={(e) => setY(e.target.value)} />
        <button onClick={() => fetchPreviewData()}>Predict</button>
      </div>
      <Result trigger={buttonPopup} setTrigger={setButtonPopup}>
        {previewBlob && (
          <div>
            {/* Hiển thị hình ảnh từ Blob */}
            <img src={URL.createObjectURL(previewBlob)} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        )}
        
      </Result>
    </div>
  ) : "";
}

export default Predict