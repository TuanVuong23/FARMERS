import React, { useState } from 'react';
import './Preview.css'; // Import file CSS

const Preview = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleXChange = (e) => {
    const newX = parseInt(e.target.value, 10);
    setX(newX);
  };

  const handleYChange = (e) => {
    const newY = parseInt(e.target.value, 10);
    setY(newY);
  };

  const handleRenderClick = () => {
    if (x + y === 144) {
      console.log('Rendering with X:', x, 'and Y:', y);
    } else {
      console.error('X + Y must equal 144');
    }
  };

  return (
    <div className="preview-container">
      {/* Phần bên trái */}
      <div className="left-pane">
        {/* Hiển thị ảnh tại đây */}
        <img
          src={require("./images/XY.jpg").default}
          alt="Your Image"
          className="image-preview"
        />
      </div>

      {/* Phần bên phải */}
      <div className="right-pane">
        {/* Input cho X */}
        <label>
          X:
          <input type="number" value={x} onChange={handleXChange} min={0} max={144} className="input-x" />
        </label>

        {/* Input cho Y */}
        <label>
          Y:
          <input type="number" value={y} onChange={handleYChange} min={0} max={144} className="input-y" />
        </label>

        {/* Nút Render */}
        <button onClick={handleRenderClick} className="render-button">Render</button>
      </div>
    </div>
  );
};

export default Preview;
