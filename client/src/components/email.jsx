import React, { useRef, useState } from 'react';
import IndexAPI from '../apis/indexAPI';

const EmailC = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const nameInput = useRef(null);
    const emailInput = useRef(null);
    const subjectInput = useRef(null);
    const messageInput = useRef(null);

    const submitEmail = async (e) => {
        e.preventDefault()
        try{
            const response = await IndexAPI.post("/email", {
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
        <div>
            <div>
                <p className="title">Email</p>
            </div>
            <div>
                <form method="POST" action="/email">
                    <div className="grid email-modal-grid">
                        <label>name</label>
                        <input type="text" ref={nameInput} onChange={e => setName(e.target.value)} name="name"/>
                    </div>
                    <div className="grid email-modal-grid">
                        <label>email</label>
                        <input type="email" ref={emailInput} onChange={e => setEmail(e.target.value)} name="email" required/>
                    </div>
                    <div className="grid email-modal-grid">
                        <label>subject</label>
                        <input type="text" ref={subjectInput} onChange={e => setSubject(e.target.value)} name="subject" required/>
                    </div>
                    <div className="grid email-modal-grid">
                        <label>message</label>
                        <textarea name="message" ref={messageInput} onChange={e => setMessage(e.target.value)} rows="10" required></textarea>
                    </div>
                    <div>
                        <button onClick={submitEmail} type="submit" className="form-button">submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EmailC;