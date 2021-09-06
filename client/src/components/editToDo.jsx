import React, { useEffect, useRef, useState } from 'react';
import PlannerAPI from '../plannerAPI.js';

const EditToDoC = (props) => {

    const [editModal, setEditModal] = useState("modal");
    const [listCollection, setListCollection] = useState(props.listCollection);

    const [id, setId] = useState("")
    const [list, setList] = useState("");
    const [toDo, setToDo] = useState("");
    const [dueDate, setDueDate] = useState("");
    // const [imgRef, setImgRef] = useState(null);
    const [info, setInfo] = useState("");
    const [position, setPosition] = useState("");

    const toDoInput = useRef(null);
    const dueDateInput = useRef(null);
    const infoInput = useRef(null);
    const positionInput = useRef(null);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                setListCollection(props.listCollection)
                if(list === "" || id !== props.id){
                    setId(props.id)
                    setList(props.list)
                    setToDo(props.toDo)
                    setDueDate(props.dueDate)
                    setInfo(props.info)
                    setPosition(props.position)
                }

            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    });

    const editToDo = async (e) => {
        e.preventDefault()
        try{

            const update = await PlannerAPI.put(`/planner/edit-toDo`,{
                id: props.id,
                list: list,
                toDo: toDo,
                dueDate: dueDate,
                info: info,
                position: position
            });
            
            setEditModal("modal");
            
        }catch(err){
            console.log(err);
        }
    };

    return(
        <div className="main-body">

            {/* Edit To Do */}
            <div className="toDo-modal-grid">
                <label>To Do</label>
                <input className="modal-header title" value={toDo} ref={toDoInput} onChange={e => setToDo(e.target.value)} type="text" name="todo" required/>
            </div>
            <div className="toDo-modal-grid">
                <label>List</label>
                <select className="modal-header" value={list} onChange={e => setList(e.target.value)}>
                    {listCollection.map(list => {
                        return(
                            <option key={list}>{list}</option>
                        )
                    })}
                </select>
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
                <label>Position</label>
                <input className="modal-header due-date" value={position} ref={positionInput} onChange={e => setPosition(e.target.value)} type="number" name="position" min="1"/>
            </div> */}
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