import React from 'react';
import { Button } from "reactstrap";
import './App.css'


// if the trigger is set to true the popup displays, when the user hits close it sets it back to false
// from homepage we are sending in state details to display as the children
function Popup(props) {
    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <Button color="success" outline className='close-btn' onClick={() => props.setTrigger(false)}>Close</Button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Popup