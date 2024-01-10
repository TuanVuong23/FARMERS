import React from 'react'
import "./Result.css"
import { useState } from 'react';

function Result(props) {
    const [buttonPopup, setButtonPopup] = useState(false);

  return (props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}></button>
        <img src={props.image} alt="Success" />
        { props.children }
        <h2>Here is your result!</h2>
      </div>
    </div>
  ) : "";
}

export default Result