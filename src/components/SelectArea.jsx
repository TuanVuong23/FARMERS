import React, { useState } from 'react';
import Result from './Result';
import './SelectArea.css'
import api from './api'

function SelectArea(props) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [xValue, setXValue] = useState('');
  const [yValue, setYValue] = useState('');
  const [confirmedX, setConfirmedX] = useState(null);
  const [confirmedY, setConfirmedY] = useState(null);
  const [coordinatesConfirmed, setCoordinatesConfirmed] = useState(false);
  const [predictBlob, setPredictBlob] = useState(null);


  const handleConfirmButtonClick = () => {
    // Kiểm tra giá trị của X và Y
    const parsedX = parseFloat(xValue);
    const parsedY = parseFloat(yValue);

    if (isNaN(parsedX) || isNaN(parsedY) || parsedX > 8000 || parsedY > 8000) {
      alert('Invalid X or Y value. Please enter a number <= 8000.');
      return;
    }

    setConfirmedX(parsedX);
    setConfirmedY(parsedY);
    setCoordinatesConfirmed(true);
  };

  const handlePredictButtonClick = () => {
    // Additional logic for Predict button if needed
    setButtonPopup(true);
  };

  const redDotStyle = {
    position: 'absolute',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'red',
    top: `${confirmedY}px`,
    left: `${confirmedX}px`,
    transform: 'translate(-50%, -50%)', // Center the dot on the coordinates
  };

  const fetchPredictData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await api.post(
        '/file/predict', 
        {
          "fileNameHDR": "hyper_20220326_3cm.hdr",
          "fileNameIMG": "hyper_20220326_3cm.img",
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
      setPredictBlob(blob);
      setButtonPopup(true);
    } catch (error) {
      alert('Error fetching predict data:');
    }
  }

  return (props.trigger) ? (
    <div className="popup-SA">
      <div className="popup-inner-SA">
        <h2>Here is your Preview</h2>
        <div className="image-container" style={{ position: 'relative', width: '800px', height: '800px', backgroundColor: 'transparent', marginTop:'20px', marginBottom: '80px' }}>
          {props.children}
          {confirmedX !== null && confirmedY !== null && (
            <div style={redDotStyle}></div>
          )}
        </div>
        
        <div>
          <h3>Please input the coordinates values to Select a particular Area!</h3>
          <h4>Note: The Red dot is your Selected Area!</h4>
          <label htmlFor="xInput">X:</label>
          <input
            type="number"
            id="xInput"
            value={xValue}
            onChange={(e) => setXValue(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="yInput">Y:</label>
          <input
            type="number"
            id="yInput"
            value={yValue}
            onChange={(e) => setYValue(e.target.value)}
          />
        </div>
        {coordinatesConfirmed ? (
          <button onClick={() => {handlePredictButtonClick(); fetchPredictData(); setButtonPopup(true);}}>Predict</button>
        ) : (
          <button onClick={handleConfirmButtonClick}>Confirm</button>
        )}
        <button className="close-btn-SA" onClick={() => props.setTrigger(false)}></button>
      </div>
      <Result trigger={buttonPopup} setTrigger={setButtonPopup}>
        {predictBlob && (
          <div>
            {/* Hiển thị hình ảnh từ Blob */}
            <img src={URL.createObjectURL(predictBlob)} alt="Predict" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        )}
        
      </Result>
    </div>
  ) : null;
}

export default SelectArea;
