import React, { useState } from 'react';

const ResultComponent = ({ imageUrl, onXInputChange, onYInputChange, onConfirm }) => {
  const [xValue, setXValue] = useState('');
  const [yValue, setYValue] = useState('');

  return (
    <div className="result-container">
      <img src={imageUrl} alt="Uploaded Image" width={360} height={260} />

      <div className="input-container">
        <label htmlFor="xInput">X:</label>
        <input
          type="text"
          id="xInput"
          value={xValue}
          onChange={(e) => setXValue(e.target.value)}
        />

        <label htmlFor="yInput">Y:</label>
        <input
          type="text"
          id="yInput"
          value={yValue}
          onChange={(e) => setYValue(e.target.value)}
        />
      </div>

      <button onClick={() => onConfirm(xValue, yValue)}>Confirm</button>
    </div>
  );
};

export default ResultComponent;
