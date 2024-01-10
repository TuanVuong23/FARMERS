import React from 'react'
import "./Preview.css"
import Predict from "./Predict"
import { useState } from 'react'

function Preview(props) {
  const [ buttonPopup, setButtonPopup ] = useState(false);

  return (props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}></button>
        <img src={props.image} alt="Success" />
        { props.children }
        <button onClick={() => { setButtonPopup(true); }} className="preview">Preview</button>
      </div>

      <Predict trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h2>Here is your Preview picture</h2>
      </Predict>
    </div>
  ) : "";
}

export default Preview