import React, { useState } from 'react';


const EventModalC = ({onSave, onClose}) => {

    const [title, setTitle] = useState('');

    return(
        <div className="main-body">
           <div className="title">Event</div>

           <input value={title} onChange={e => setTitle(e.target.value)} id="event-title-input" placeholder="Event Title"/>

           <button onClick={() => {title? onSave(title) : onSave('')}} id="save-button">Save</button>
           <button onClick={onClose} id="cancel-button">Cancel</button>
        </div>
    )
}

export default EventModalC;