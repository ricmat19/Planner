import React, { useContext, useEffect, useRef, useState } from 'react';
import PlannerAPI from '../plannerAPI.js';
import {PlannerContext} from '../plannerContext';


const ToDoC = (props) => {

    const{creatToDo} = useContext(PlannerContext);

    const [input, setInput] = useState("");
    let toDoArray = [];
    const [listModal, setListModal] = useState("modal");
    const [toDoModal, setToDoModal] = useState("modal");
    const [toDoList, setToDoList] = useState([]);
    const [toDos, setToDos] = useState([]);
    let highestKey = localStorage.length;

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

    const displayToDoModal = () =>{
        setToDoModal("modal modal-active");
    }

    const modalRef = useRef();
    const listRef = useRef();

    useEffect(() => {
        const fetchData = async (req, res) => {
            // try{
                const response = await PlannerAPI.get(`/planner`);
                setToDoList(response.data.data);
                console.log(response.data.data)

                // document.addEventListener("mousedown", (event) => {
                //     if(modalRef.current !== null){
                //         if(!modalRef.current.contains(event.target)){
                //             setToDoModal("modal");
                //         }
                //         if(!listRef.current.contains(event.target)){
                //             setToDoModal("modal");
                //         }
                //     }
                // })

                // getToDos();
            // }catch(err){
            //     console.log(err);
            // }
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
            console.log(list)
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

    const deleteToDo = (e) => {
        // let elementClicked = e.target;
        // console.log(elementClicked)
        // if(elementClicked.classList[0] === "to-do-delete"){
        //     let removedToDo = elementClicked.parentElement;
        //     removedToDo.remove();
        //     let elementRemoved = elementClicked.getAttribute('id');
        //     localStorage.removeItem(elementRemoved);
        // }
        // getToDos()  
    };

    return(
        <div className="main-body">

            {/* Create List */}
            <div className={listModal}>
                <form>
                    <div ref={listRef} className="modal-content">
                        <div>
                            <input className="modal-header title" value={list} ref={listInput} onChange={e => setList(e.target.value)} type="text" name="list"/>
                        </div>
                        <div>
                            <button onClick={createList}>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        
            {/* Create ToDo */}
            <div className={toDoModal}>
                <form>
                    <div ref={modalRef} className="modal-content">
                        <div>
                            <input className="modal-header title todo" value={toDo} ref={toDoInput} onChange={e => setToDo(e.target.value)} type="text" name="todo"/>
                        </div>
                        <div className="toDo-modal-grid">
                            <label>in list</label>
                            <input className="modal-header list" value={list} ref={listInput} onChange={e => setList(e.target.value)} type="text" name="list"/>
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
                {/* {toDos.map(toDoSet => { */}
                    <div className="grid grid-center container">
                        <div className="title">My To-Do's</div>
                        <div className="grid input-div">
                            <input onChange={e => setInput(e.target.value)} className="input-box" placeholder="Add to do..." type="text"/>
                            <button onClick={displayToDoModal} className="to-do-button"><img src="../images/pencil-alt-solid.svg"/></button>
                        </div>
                        <div className="grid to-do-list">
                        {toDos.map((toDo, index) => {
                            return(
                                <div className="grid to-do-item" key={index}>
                                    <div className="to-do-item-name">
                                        {toDo}
                                    </div> 
                                    <div id={index} onClick={e => deleteToDo(e)} className="to-do-delete">X</div>
                                </div>
                            );
                        })}
                        </div>
                    </div>
                {/* })} */}
                    <div className="grid grid-center add-list">
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