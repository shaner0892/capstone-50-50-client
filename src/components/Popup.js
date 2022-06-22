import React from 'react';
import { Button } from "reactstrap";
import './App.css'

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