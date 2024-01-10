import React, { useState, useEffect } from 'react'
import "./Predict.css"
import Result from './Result'
import axios from 'axios';

function Predict(props) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [previewData, setPreviewData] = useState(null);

  const fetchPreviewData = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://100.99.67.126:8081/file/preview', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setPreviewData(response.data);
  }

  return (props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}></button>
        <img src={props.image} alt="Success" />
        { props.children }
        <input type="text" placeholder="Enter X" value={x} onChange={(e) => setX(e.target.value)} />
        <input type="text" placeholder="Enter Y" value={y} onChange={(e) => setY(e.target.value)} />
        <button onClick={() => { setButtonPopup(true); fetchPreviewData(); }}>Predict</button>
      </div>
      <Result trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h2> Here is your result!</h2>
        {previewData && <div>{JSON.stringify(previewData)}</div>}
      </Result>
    </div>
  ) : "";
}

export default Predict