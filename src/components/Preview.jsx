import React, { useState } from 'react';
import "./Preview.css";

function Preview(props) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleRender = () => {
    if (x + y !== 144) {
      alert('X + Y must equal 144');
      return;
    }

    // Add your render logic here
  };

  return (props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>
        { props.children }
        <input type="number" value={x} onChange={(e) => setX(Number(e.target.value))} placeholder="Enter X" />
        <input type="number" value={y} onChange={(e) => setY(Number(e.target.value))} placeholder="Enter Y" />
        <button onClick={handleRender}>RENDER</button>
      </div>
    </div>
  ) : "";
}

export default Preview;