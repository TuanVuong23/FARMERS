import React, { useState } from 'react';
import Result from './Result';
import './SelectArea.css';
import api from './api';

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
      alert('Giá trị X hoặc Y không hợp lệ. Vui lòng nhập một số <= 8000.');
      return;
    }

    setConfirmedX(parsedX);
    setConfirmedY(parsedY);
    setCoordinatesConfirmed(true);
  };

  const handlePredictButtonClick = () => {
    fetchPredictData();
  };

  const redDotStyle = {
    position: 'absolute',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'red',
    top: `${confirmedY}px`,
    left: `${confirmedX}px`,
    transform: 'translate(-50%, -50%)',
  };

  const fetchPredictData = async () => {
    const token = localStorage.getItem('token');
    if (props.filesForServer && props.filesForServer.fileNameHDR) {
      try {
        const response = await api.post(
          '/file/predict',
          {
            fileNameHDR: props.filesForServer.fileNameHDR,
            fileNameIMG: props.filesForServer.fileNameIMG,
            x: confirmedX,
            y: confirmedY,
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
        setPredictBlob(blob);
        setButtonPopup(true);
      } catch (error) {
        console.log('Lỗi khi lấy dữ liệu dự đoán:' + error.message);
      }
    } else {
      console.log(props.filesForServer);
    }
  };

  return props.trigger ? (
    <div className="popup-SA">
      <div className="popup-inner-SA">
        <h2>Đây là Xem trước của bạn</h2>
        <div className="image-container" style={{ position: 'relative', width: '800px', height: '800px', backgroundColor: 'transparent', marginTop: '20px', marginBottom: '80px' }}>
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
          <button onClick={handlePredictButtonClick}>Predict</button>
        ) : (
          <button onClick={handleConfirmButtonClick}>Confirm</button>
        )}
        <button className="close-btn-SA" onClick={() => props.setTrigger(false)}></button>
      </div>
      <Result trigger={buttonPopup} setTrigger={setButtonPopup}>
        {predictBlob && (
          <div>
            {/* Hiển thị hình ảnh từ Blob */}
            <img src={URL.createObjectURL(predictBlob)} alt="Dự đoán" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        )}
      </Result>
    </div>
  ) : null;
}

export default SelectArea;
