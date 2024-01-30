import React from 'react';
import "./History.css";
function History(props) {
  return props.trigger ? (
    <div className="history-popup">
      <div className="history-popup-inner">
        <button className="close-btn-history" onClick={() => props.setTrigger(false)}></button>
        <div className="history-content">
          <div className="image-container">
            <h1
            style={{marginBottom: '20px'}}>Here is your Image!</h1>
            {props.children}
          </div>
        </div>
    </div>
</div>
  ) : "";
}

export default History;