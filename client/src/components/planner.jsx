import React, { useEffect, useRef, useState } from 'react';
import PlannerAPI from '../plannerAPI.js';


const ToDoC = (props) => {

    const [input, setInput] = useState("");
    let toDoArray = [];
    const [toDoModal, setToDoModal] = useState("modal");
    const [toDoLists, setToDoLists] = useState([]);
    const [toDos, setToDos] = useState([]);
    let highestKey = localStorage.length;

    const modalRef = useRef();

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                const response = await PlannerAPI.get(`/planner`);
                setToDoLists(response.data.data);

                document.addEventListener("mousedown", (event) => {
                    if(modalRef.current !== null){
                        if(!modalRef.current.contains(event.target)){
                            setToDoModal("modal");
                        }
                    }
                })

                // getToDos();
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

    const createList = (e) => {

    };

    function addToDo(){
        setToDoModal("modal modal-active");
    };

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
            <div className={toDoModal}>
                <form>
                    <div ref={modalRef} className="modal-content">
                        <div>
                            <input className="modal-header title todo" type="text" name="todo"/>
                        </div>
                        <div className="toDo-modal-grid">
                            <label>in list</label>
                            <input className="modal-header list" type="text" name="list"/>
                        </div>
                        <div className="toDo-modal-grid">
                            <label>Description</label>
                            <textarea className="modal-header info" type="text" name="info"/>
                        </div>
                        <div className="toDo-modal-grid">
                            <label>Due Date</label>
                            <input className="modal-header due-date" type="date" name="dueDate"/>
                        </div>
                        <div className="toDo-modal-grid">
                            <label>Attachment</label>
                            <input className="modal-header image" type="file" name="file"/>
                        </div>
                        <div>
                            <button>Save</button>
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
                            <button onClick={addToDo} className="to-do-button"><img src="../images/pencil-alt-solid.svg"/></button>
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
                        <button onClick={() => createList()} className="add-list-button">
                            <img className="add-list-image" src="../images/plus-solid.svg"/>
                            <div>Add a List</div>
                        </button>
                    </div>
            </div>
        </div>
    )
}

export default ToDoC;