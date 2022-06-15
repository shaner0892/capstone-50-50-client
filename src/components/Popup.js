// import React from "react";

// export const Popup = props => {
//     return (
//         <div className="popup-box">
//             <div className="box">
//                 <span className="close-icon" onClick={props.handleClose}>x</span>
//                 {props.content}
//             </div>
//         </div>
//     );
// };


// import React from 'react';
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';

// export default () => (
//     <Popup trigger={<button> Trigger</button>} position="right center">
//         <div>Popup content here !!</div>
//     </Popup>
// );

import React from 'react';

function Popup(props) {
    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <button className='close-btn'>close</button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Popup