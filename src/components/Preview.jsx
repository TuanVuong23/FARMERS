import React from 'react'
import "./Preview.css"

function Preview(props) {
  return (props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}></button>
        <img src={props.image} alt="Success" />
        { props.children }
      </div>
  

    </div>
  ) : "";
}

export default Preview