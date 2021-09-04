import React, { useState } from 'react';


const EventModalC = ({onDelete, eventText, onClose}) => {

    const [title, setTitle] = useState('');

    return(
        <div className="main-body">
           <div className="title">Event</div>

           <div className="eventText">{eventText}</div>

            <button onClick={onDelete} id="save-button">Delete</button>
            <button onClick={onClose} id="cancel-button">Cancel</button>
        </div>
    )
}

export default EventModalC;