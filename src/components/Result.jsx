import React from 'react'
import "./Result.css"
import { useState } from 'react';

function Result(props) {
    

  return (props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}></button>
        { props.children }
        <h2>Here is your result!</h2>
      </div>
    </div>
  ) : "";
}

export default Result