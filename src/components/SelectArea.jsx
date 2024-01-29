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
  const [loading, setLoading] = useState(false);
  const [inputMode, setInputMode] = useState(true);

  const handleConfirmButtonClick = () => {
    const parsedX = parseFloat(xValue);
    const parsedY = parseFloat(yValue);

    if (isNaN(parsedX) || isNaN(parsedY) || parsedX > 8000 || parsedY > 8000) {
      alert('Invalid X or Y value. Please enter a number <= 8000.');
      return;
    }

    setConfirmedX(parsedX);
    setConfirmedY(parsedY);
    setCoordinatesConfirmed(true);
    setInputMode(false);
  };

  const handleReenterButtonClick = () => {
    setInputMode(true);
  };

  const handlePredictButtonClick = () => {
    fetchPredictData();
  };

  const overlayStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: loading ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column', // Stack items vertically
    textAlign: 'center', // Center text
  };

  const redDotStyle = {
    position: 'absolute',
    width: '10px',
    height: '10px',
    backgroundColor: 'red',
    top: `${confirmedY / 20}px`,
    left: `${confirmedX / 20}px`,
    transform: 'translate(-50%, -50%)',
  };

  const fetchPredictData = async () => {
    setLoading(true);
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
        console.log('Error fetching prediction data: ' + error.message);
      } finally {
        setLoading(false);
      }
    } else {
      console.log(props.filesForServer);
    }
  };

  return props.trigger ? (
    <div className="popup-SA">
      <div className="popup-inner-SA">
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div className="image-container" style={{ position: 'relative', marginTop: '40px', marginLeft: '40px', width: '300px', height: '400px', backgroundColor: 'transparent' }}>
            {props.children}
            {confirmedX !== null && confirmedY !== null && (
              <div style={redDotStyle}></div>
            )}
          </div>

          <div style={{ width: '50%', padding: '20px' }}>
            <h2
              style={{
                textAlign: 'center',
                marginBottom: '20px',
              }}
            >Here is your Preview Image!</h2>
            <h3>Please input the coordinates values to select a particular area!</h3>
            <h4>Note: The red dot is your selected area!</h4>
            <div>
              <label htmlFor="xInput">X:</label>
              <input
                type="number"
                id="xInput"
                value={xValue}
                onChange={(e) => setXValue(e.target.value)}
                disabled={!inputMode}
              />
            </div>
            <div>
              <label htmlFor="yInput">Y:</label>
              <input
                type="number"
                id="yInput"
                value={yValue}
                onChange={(e) => setYValue(e.target.value)}
                disabled={!inputMode}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              {inputMode ? (
                <button onClick={handleConfirmButtonClick}>Confirm</button>
              ) : (
                <button onClick={handleReenterButtonClick}>Re-enter</button>
              )}
              <button onClick={handlePredictButtonClick}>Predict</button>
            </div>
          </div>
        </div>

        <button className="close-btn-SA" onClick={() => props.setTrigger(false)}></button>
      </div>

      <div style={overlayStyle}>
        {loading && 
          <div className='loading-spinner'> 
          </div>
        }
        <p style={{color: 'white', marginTop: '20px', fontSize:'1.5rem'}}>Just a moment...</p>
        </div>

      <Result trigger={buttonPopup} setTrigger={setButtonPopup}>
        {predictBlob && (
          <div>
            <img src={URL.createObjectURL(predictBlob)} alt="Prediction" style={{ width: '400px', height: '400px' }} />
          </div>
        )}
      </Result>
    </div>
  ) : null;
}

export default SelectArea;
