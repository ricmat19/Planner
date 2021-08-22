import React, { useEffect, useState } from 'react';
import PlannerAPI from '../plannerAPI.js';


const ToDoC = () => {

    const [input, setInput] = useState("");
    let toDoArray = [];
    const [toDoList, setToDoList] = useState([]);
    let highestKey = localStorage.length;

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
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

    function getStorageSize(){
        for(let i = 0; i <= localStorage.length; i++){
            if(parseInt(localStorage.key(i), 10) >= highestKey){
                highestKey = parseInt(localStorage.key(i));
            }
        }
    }

    function getToDos(){
        getStorageSize();
        for(let i = 1; i <= localStorage.length; i++){
            if(localStorage.getItem(i) !== null){
                toDoArray.push(localStorage.getItem(i));
            }
        }
        setToDoList(toDoArray)
    }

    function addToDo(){
        getToDos()
        let newKey = highestKey + 1;
        if (input !== ""){
            toDoArray.push(input);
            localStorage.setItem(newKey, input);
            setToDoList(toDoArray)
            getStorageSize()
            console.log(highestKey)
        }
        setInput("");
    };

    const deleteToDo = (e) => {
        let elementClicked = e.target;
        console.log(elementClicked)
        if(elementClicked.classList[0] === "to-do-delete"){
            let removedToDo = elementClicked.parentElement;
            removedToDo.remove();
            let elementRemoved = elementClicked.getAttribute('id');
            localStorage.removeItem(elementRemoved);
        }
        getToDos()  
    };

    return(
        <div className="main-body">
            <div className="grid grid-center">
                <div className="grid grid-center container">
                    <div className="title">My To-Do's</div>
                    <div className="grid input-div">
                        <input onChange={e => setInput(e.target.value)} className="input-box" placeholder="Add to do..." type="text"/>
                        <button onClick={() => addToDo()} className="to-do-button"><img src="../images/pencil-alt-solid.svg"/></button>
                    </div>
                    <div className="grid to-do-list">
                    {toDoList.map((toDo, index) => {
                        return(
                            <div className="grid to-do-item" key={index}>
                                <div className="to-do-item-name">
                                    {toDo}
                                </div> 
                                <div id={highestKey} onClick={e => deleteToDo(e)} className="to-do-delete">X</div>
                            </div>
                        );
                    })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToDoC;