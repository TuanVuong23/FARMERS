import React from 'react';
import "./Result.css";
import { Link } from 'react-router-dom';
function Result(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}></button>
        <div className="result-content">
          <div className="image-container">
            {props.children}
          </div>
          <div className="text-container">
            <h1 style={{color: '#00563B', marginBottom:'20px'}}>Here is your result!</h1>
            <h3>Which:</h3>
            <img src={require('./images/Explain.png')} style={{ marginTop: '20px' }}></img>   
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Link to="/">
                <button style={{
                  backgroundColor: '#00563B',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: '0.3s',
                  fontSize: '16px',
                  outline: 'none',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#007f5f'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#00563B'}
                >
                  Get Back
                </button>
              </Link>         
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : "";
}

export default Result;