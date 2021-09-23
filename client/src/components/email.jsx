import React, { useEffect, useRef, useState } from 'react';
import PlannerAPI from '../apis/plannerAPI';

const EmailC = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const nameInput = useRef(null);
    const emailInput = useRef(null);
    const subjectInput = useRef(null);
    const messageInput = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await PlannerAPI.post("/email", {
                name: name,
                email: email,
                subject: subject,
                message: message
            })

            nameInput.current.value = "";
            emailInput.current.value = "";
            subjectInput.current.value = "";
            messageInput.current.value = "";
             
        }catch(err){
            console.log(err);
        }

    }

    return(
        <div className="main-body">
            <div className="center">
                <p className="title">Email</p>
            </div>
            <div className="form-div">
                <form className="contact-form" method="POST" action="/email">
                    <div className="email-modal-grid">
                        <label>name</label>
                        <input type="text" ref={nameInput} onChange={e => setName(e.target.value)} name="name" className="modal-header"/>
                    </div>
                    <div className="email-modal-grid">
                        <label>email</label>
                        <input type="email" ref={emailInput} onChange={e => setEmail(e.target.value)} name="email" className="modal-header" required/>
                    </div>
                    <div className="email-modal-grid">
                        <label>subject</label>
                        <input type="text" ref={subjectInput} onChange={e => setSubject(e.target.value)} name="subject" className="modal-header" required/>
                    </div>
                    <div className="email-modal-grid">
                        <label>message</label>
                        <textarea className="modal-header" name="message" ref={messageInput} onChange={e => setMessage(e.target.value)} rows="10" required></textarea>
                    </div>
                    <div>
                        <button onClick={handleSubmit} type="submit" className="btn form-button">submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EmailC;