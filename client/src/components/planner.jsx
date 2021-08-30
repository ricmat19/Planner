import React, { useContext, useEffect, useRef, useState, useParams} from 'react';
import PlannerAPI from '../plannerAPI.js';
import {PlannerContext} from '../plannerContext';


const ToDoC = (props) => {

    const{creatToDo} = useContext(PlannerContext);

    const [input, setInput] = useState("");
    const [listModal, setListModal] = useState("modal");
    const [toDoModal, setToDoModal] = useState("modal");
    const [editModal, setEditModal] = useState("modal");
    const [editModalInputs, setEditModalInputs] = useState({});
    const listArray = [];
    const [toDoList, setToDoList] = useState([]);
    const toDosArray = [];
    const [toDos, setToDos] = useState([]);

    const [modalList, setModalList] = useState('')

    const [id, setId] = useState("");
    const [list, setList] = useState("");
    const [toDo, setToDo] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [imgRef, setImgRef] = useState("");
    const [info, setInfo] = useState("");

    const listInput = useRef(null);
    const toDoInput = useRef(null);
    const dueDateInput = useRef(null);
    const infoInput = useRef(null);

    const displayListModal = () => {
        setListModal("modal modal-active");
    };

    const displayToDoModal = (list) => {
        setToDoModal("modal modal-active");
        setModalList(list)
        setList(list)
    }

    const displayEditModal = (id, list, toDo, dueDate, info) => {
        setEditModal("modal modal-active");
        setId(id);
        setList(list);
        setToDo(toDo);
        setDueDate(dueDate);
        setInfo(info);
    }

    const toDoRef = useRef();
    const listRef = useRef();
    const editRef = useRef();

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                const listResponse = await PlannerAPI.get(`/lists`);
                const toDosResponse = await PlannerAPI.get(`/planner`);

                for(let i=0; i < listResponse.data.data.lists.length; i++){
                    listArray.push(listResponse.data.data.lists[i].list)
                }
                setToDoList(listArray);

                for(let i=0; i < toDosResponse.data.data.toDos.length; i++){
                    toDosArray.push(toDosResponse.data.data.toDos[i])
                }
                setToDos(toDosArray);

                document.addEventListener("mousedown", (event) => {
                    if(toDoRef.current !== null && listRef.current !== null && editRef.current !== null){
                        if(!listRef.current.contains(event.target)){
                            setListModal("modal");
                        }
                        if(!toDoRef.current.contains(event.target)){
                            setToDoModal("modal");
                        }
                        if(!editRef.current.contains(event.target)){
                            setEditModal("modal");
                        }
                    }
                })

            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, []);

    const createList = async (e) => { 
        e.preventDefault()
        try{
            const response = await PlannerAPI.post("/planner/add-list",{
                list,
            });

            listInput.current.value = "";

            setListModal("modal");

        }catch(err){
            console.log(err);
        }
    };

    const createToDo = async (e) =>{
        e.preventDefault()
        try{

            let formData = new FormData();
            
            formData.append('list', list);
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

            listInput.current.value = "";
            toDoInput.current.value = "";
            dueDateInput.current.value = "";
            infoInput.current.value = "";

            setToDoModal("modal");

        }catch(err){
            console.log(err);
        }
    }

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

    const deleteList = async (list) => {
        try{
            const response = await PlannerAPI.delete(`/planner/delete-list/${list}`);
            setToDoList(toDoList.filter(list => {
               return list.list !== list;
            }))
        }catch(err){
            console.log(err);
        }
    };

    const deleteToDo = async (id) => {
        try{
            const response = await PlannerAPI.delete(`/planner/delete-toDo/${id}`);
            setToDos(toDos.filter(toDo => {
               return toDo.id !== id;
            }))
        }catch(err){
            console.log(err);
        }
    };

    return(
        <div className="main-body">

            {/* Create List */}
            <div className={listModal}>
                <form>
                    <div ref={listRef} className="modal-content">
                        <div>
                            <label className="title">List</label>
                        </div>
                        <input className="modal-header" value={list} ref={listInput} onChange={e => setList(e.target.value)} type="text" name="list"/>
                        <div>
                            <button onClick={createList}>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        
            {/* Create ToDo */}
            <div className={toDoModal}>
                <form>
                    <div ref={toDoRef} className="modal-content">
                        <div className="toDo-modal-grid">
                            <label>To Do</label>
                            <input className="modal-header title" ref={toDoInput} onChange={e => setToDo(e.target.value)} type="text" name="todo" required/>
                        </div>
                        <div className="toDo-modal-grid">
                            <label>List</label>
                            <div className="modal-header">{modalList}</div>
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
                </form>
            </div>

            {/* Edit ToDo */}
            <div className={editModal}>
                <form>
                    <div ref={editRef} className="modal-content">
                        <div className="toDo-modal-grid">
                            <label>To Do</label>
                            <input className="modal-header title" value={toDo} ref={toDoInput} onChange={e => setToDo(e.target.value)} type="text" name="todo" required/>
                        </div>
                        <div className="toDo-modal-grid">
                            <label>List</label>
                            <select className="modal-header" value={list} onChange={e => setList(e.target.value)}>
                                {toDoList.map(list => {
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
                            <label>Attachment</label>
                            <input  type="file" onChange={e => setImgRef(e.target.files[0])} name="imgRef" className="form-control" required/>
                        </div> */}
                        <div>
                            <button onClick={editToDo}>Save</button>
                        </div>
                    </div>
                </form>
            </div>

            {/* To Do Lists */}
            <div className="grid grid-center align-horizontal">
                {toDoList.map(list => {
                    return(
                        <div key={list} className="grid grid-center container">
                            <div onClick={() => deleteList(list)} className="delete-list">X</div>
                            <div className="title">{list}</div>
                            <div className="grid input-div">
                                <button onClick={() => displayToDoModal(list)} className="to-do-button">
                                    <img src="../images/pencil-alt-solid.svg"/>
                                </button>
                            </div>
                            <div className="grid to-do-list">
                            {toDos.map((toDo, index) => {
                                if(list === toDo.list){
                                    return(
                                        <div key={index} className="grid to-do-item">
                                            <div onClick={() => displayEditModal(toDo.id, toDo.list, toDo.todo, toDo.dueDate, toDo.info)} className="edit-toDo">
                                                <img src="../images/wrench-solid.svg"/>
                                            </div>
                                            <div className="to-do-item-name">
                                                {toDo.todo}
                                            </div> 
                                            <div onClick={() => deleteToDo(toDo.id)} className="delete-toDo">X</div>
                                        </div>
                                    );
                                }
                            })}
                            </div>
                        </div>
                    );
                })}
                
                {/* Add List */}
                <div className="grid grid-center container add-list-container">
                    <button onClick={displayListModal} className="add-list-button">
                        <img className="add-list-image" src="../images/plus-solid.svg"/>
                        <div>Add a List</div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ToDoC;