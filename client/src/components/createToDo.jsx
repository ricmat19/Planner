import React, { useRef, useState } from 'react';
import PlannerAPI from '../plannerAPI.js';

const CreateToDoC = (props) => {

    const [toDoModal, setToDoModal] = useState("modal");

    const [toDo, setToDo] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [imgRef, setImgRef] = useState("");
    const [info, setInfo] = useState("");

    const toDoInput = useRef(null);
    const dueDateInput = useRef(null);
    const infoInput = useRef(null);

    const createToDo = async (e) =>{
        e.preventDefault()
        try{

            let formData = new FormData();
            
            formData.append('list', props.list);
            formData.append('toDo', toDo);
            formData.append('dueDate', dueDate);
            formData.append('imgRef', imgRef);
            formData.append('info', info);

            console.log(Array.from(formData))
            console.log(formData)

            const response = await PlannerAPI.post("/planner/add-toDo",
                formData,
                {
                    headers: {"Content-Type": "multipart/form-data"}
                }
            )
            .then(res => console.log(res))
            .catch(err => console.log(err))

            console.log(response)

            toDoInput.current.value = "";
            dueDateInput.current.value = "";
            infoInput.current.value = "";

            setToDoModal("modal");

        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="main-body">

            {/* Create To Do */}
            <div className="toDo-modal-grid">
                <label>To Do</label>
                <input className="modal-header title" ref={toDoInput} onChange={e => setToDo(e.target.value)} type="text" name="todo" required/>
            </div>
            <div className="toDo-modal-grid">
                <label>List</label>
                <div className="modal-header">{props.list}</div>
            </div>
            <div className="toDo-modal-grid">
                <label>Description</label>
                <textarea className="modal-header info" value={info} ref={infoInput} onChange={e => setInfo(e.target.value)} type="text" name="info"/>
            </div>
            <div className="toDo-modal-grid">
                <label>Due Date</label>
                <input className="modal-header due-date" value={dueDate} ref={dueDateInput} onChange={e => setDueDate(e.target.value)} type="date" name="dueDate"/>
            </div>
            {/* <div className="toDo-modal-grid">
                <label>Attachment</label>
                <input  type="file" onChange={e => setImgRef(e.target.files[0])} name="imgRef" className="form-control" required/>
            </div> */}
            <div>
                <button onClick={createToDo}>Save</button>
            </div>
        </div>
    )
}

export default CreateToDoC;