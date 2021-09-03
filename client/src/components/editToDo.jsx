import React, { useEffect, useRef, useState } from 'react';
import PlannerAPI from '../plannerAPI.js';

const EditToDoC = (props) => {
    console.log(props)

    const [editModal, setEditModal] = useState("modal");
    const [toDoList, setToDoList] = useState([]);

    const [id, setId] = useState(props.id);
    const [list, setList] = useState(props.list);
    const [toDo, setToDo] = useState(props.toDo);
    const [dueDate, setDueDate] = useState(props.dueDate);
    // const [imgRef, setImgRef] = useState(null);
    const [info, setInfo] = useState(props.info);

    const toDoInput = useRef(null);
    const dueDateInput = useRef(null);
    const infoInput = useRef(null);

    const editToDo = async (e) => {
        e.preventDefault()
        try{
            const update = await PlannerAPI.put(`/planner/edit-toDo`,{
                id: id,
                list: list,
                toDo: toDo,
                dueDate: dueDate,
                info: info
            });
            
            setEditModal("modal");
            
        }catch(err){
            console.log(err);
        }
    };

    return(
        <div className="main-body">
            {console.log(props.toDo)}
            {/* Edit To Do */}
            <div className="toDo-modal-grid">
                <label>To Do</label>
                <input className="modal-header title" value={props.toDo} ref={toDoInput} onChange={e => setToDo(e.target.value)} type="text" name="todo" required/>
            </div>
            <div className="toDo-modal-grid">
                <label>List</label>
                <select className="modal-header" value={props.list} onChange={e => setList(e.target.value)}>
                    {props.listCollection.map(list => {
                        return(
                            <option key={list}>{list}</option>
                        )
                    })}
                </select>
            </div>
            <div className="toDo-modal-grid">
                <label>Description</label>
                <textarea className="modal-header info" value={props.info} ref={infoInput} onChange={e => setInfo(e.target.value)} type="text" name="info"/>
            </div>
            <div className="toDo-modal-grid">
                <label>Due Date</label>
                <input className="modal-header due-date" value={props.dueDate} ref={dueDateInput} onChange={e => setDueDate(e.target.value)} type="date" name="dueDate"/>
            </div>
            {/* <div className="toDo-modal-grid">
                <label>Attachment</label>
                <input  type="file" onChange={e => setImgRef(e.target.files[0])} name="imgRef" className="form-control" required/>
            </div> */}
            <div>
                <button onClick={editToDo}>Save</button>
            </div>
        </div>
    )
}

export default EditToDoC;