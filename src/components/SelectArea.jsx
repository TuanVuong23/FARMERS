import React, { useState } from 'react';
import Predict from './Predict';

function SelectArea(props) {
  const [xValue, setXValue] = useState('');
  const [yValue, setYValue] = useState('');
  const [showRedDot, setShowRedDot] = useState(false);
  const [redDotPosition, setRedDotPosition] = useState({ x: 0, y: 0 });

  const handleConfirmButtonClick = () => {
    const parsedX = parseFloat(xValue);
    const parsedY = parseFloat(yValue);

    if (isNaN(parsedX) || isNaN(parsedY) || parsedX > 8000 || parsedY > 8000) {
      alert('Invalid X or Y value. Please enter a number <= 8000.');
      return;
    }

    setRedDotPosition({ x: parsedX, y: parsedY });

    setShowRedDot(true);
  };

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div>
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
        <button onClick={handleConfirmButtonClick}>Confirm</button>
        <button onClick={() => props.setTrigger(false)} className="close-btn"></button>
        <h2>The red dot is your Selected Area!</h2>

        {showRedDot && (
          <div
            className="red-dot"
            style={{
              position: 'absolute',
              left: redDotPosition.x,
              top: redDotPosition.y,
              width: '10px',
              height: '10px',
              background: 'red',
              borderRadius: '50%',
            }}
          ></div>
        )}
      </div>

      <Predict trigger={false} setTrigger={setShowRedDot}>
      </Predict>
    </div>
  ) : null;
}

export default SelectArea;
