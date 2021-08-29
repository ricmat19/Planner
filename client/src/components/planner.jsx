import React, { useContext, useEffect, useRef, useState, useParams} from 'react';
import PlannerAPI from '../plannerAPI.js';
import {PlannerContext} from '../plannerContext';


const ToDoC = (props) => {

    const{creatToDo} = useContext(PlannerContext);

    const [input, setInput] = useState("");
    const [listModal, setListModal] = useState("modal");
    const [toDoModal, setToDoModal] = useState("modal");
    const listArray = [];
    const [toDoList, setToDoList] = useState([]);
    const toDosArray = [];
    const [toDos, setToDos] = useState([]);

    const [modalList, setModalList] = useState('')

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

    const toDoRef = useRef();
    const listRef = useRef();

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                const response = await PlannerAPI.get(`/planner`);

                for(let i=0; i < response.data.data.toDos.length; i++){
                    toDosArray.push(response.data.data.toDos[i])

                    listArray.push(response.data.data.toDos[i].list)
                        
                }
                let uniqueList = [...new Set(listArray)];
                setToDoList(uniqueList);
                setToDos(toDosArray);
                console.log(toDos)

                document.addEventListener("mousedown", (event) => {
                    if(toDoRef.current !== null && listRef.current !== null){
                        if(!toDoRef.current.contains(event.target)){
                            setToDoModal("modal");
                        }
                        if(!listRef.current.contains(event.target)){
                            setListModal("modal");
                        }
                    }
                })

                getToDos();
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, []);

    // inputText.addEventListener("keyup", function enterToDo(){
    //     if(event.keyCode === 13){
    //         addToDo();
    //     }
    // });

    // function getStorageSize(){
    //     for(let i = 0; i <= localStorage.length; i++){
    //         if(parseInt(localStorage.key(i), 10) >= highestKey){
    //             highestKey = parseInt(localStorage.key(i));
    //         }
    //     }
    // }

    function getToDos(){
        // getStorageSize();
        // for(let i = 1; i <= localStorage.length; i++){
        //     if(localStorage.getItem(i) !== null){
        //         toDoArray.push(localStorage.getItem(i));
        //     }
        // }
        // setToDos(toDoArray)
    }

    const createList = async (e) => { 
        e.preventDefault()
        try{
            const response = await PlannerAPI.post("/planner/add-list",{
                list,
            });

            listInput.current.value = "";
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

        }catch(err){
            console.log(err);
        }
    }

    const deleteToDo = async (id) => {
        try{
            const response = await PlannerAPI.delete(`/todo/delete-toDo/${id}`);
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
                        <div>
                            <input className="modal-header title" ref={toDoInput} onChange={e => setToDo(e.target.value)} type="text" name="todo" required/>
                        </div>
                        <div className="toDo-modal-grid">
                            <label>in list</label>
                            <div>{modalList}</div>
                        </div>
                        <div className="toDo-modal-grid">
                            <label>Description</label>
                            <textarea className="modal-header info" value={info} ref={infoInput} onChange={e => setInfo(e.target.value)} type="text" name="info"/>
                        </div>
                        <div className="toDo-modal-grid">
                            <label>Due Date</label>
                            <input className="modal-header due-date" value={dueDate} ref={dueDateInput} onChange={e => setDueDate(e.target.value)} type="date" name="dueDate"/>
                        </div>
                        <div className="toDo-modal-grid">
                            <label>Attachment</label>
                            <input  type="file" onChange={e => setImgRef(e.target.files[0])} name="imgRef" className="form-control" required/>
                        </div>
                        <div>
                            <button onClick={createToDo}>Save</button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="grid grid-center align-horizontal">
                {toDoList.map(list => {
                    return(
                        <div key={list} className="grid grid-center container">
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
                                            <div className="to-do-item-name">
                                                {toDo.todo}
                                            </div> 
                                            <div onClick={() => deleteToDo(toDo.id)} className="to-do-delete">X</div>
                                        </div>
                                    );
                                }
                            })}
                            </div>
                        </div>
                    );
                })}
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