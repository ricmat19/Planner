import React, { useEffect, useState } from 'react';
import PlannerAPI from '../plannerAPI.js';


const ToDoC = () => {

    const [input, setInput] = useState("");
    let toDoList = ""
    let addButton = document.querySelector(".to-do-button");
    let toDoKey = 0;
    let highestKey = 0;



    // inputText.addEventListener("keyup", function enterToDo(){
    //     if(event.keyCode === 13){
    //         addToDo();
    //     }
    // });

    function getStorageSize(){

        for(let i = 0; i <= localStorage.length; i++){

            if(parseInt(localStorage.key(i), 10) >= highestKey){

                highestKey = localStorage.key(i);

            }

        }

    }

    function getToDos(){

        getStorageSize()

        for(let i = 1; i <= highestKey; i++){

            if(localStorage.getItem(i) !== null){

                toDoList += '<div class="grid to-do-item"><div class="to-do-item-name">' + localStorage.getItem(i) + '</div><div id ="' + i + '" onClick={() => deleteToDo(e)} class="to-do-delete">X</div></div>';

            }

        }

        toDoKey = highestKey;

    }

    getToDos();

    function addToDo(){

        if (input !== ""){

            toDoKey++;

            toDoList.innerHTML += '<div class="grid to-do-item"><div class="to-do-item-name">' + input + '</div> <div id ="' + toDoKey + '" onClick={() => deleteToDo(e)} class="to-do-delete">X</div></div>';

            localStorage.setItem(toDoKey, input);
        }

        input = "";

    };

    const deleteToDo = (e) => {
        
        let elementClicked = e.target;

        if(elementClicked.classList[0] === "to-do-delete"){

            let removedToDo = elementClicked.parentElement;

            removedToDo.remove();

            let elementRemoved = elementClicked.getAttribute('id');

            console.log(elementRemoved);

            localStorage.removeItem(elementRemoved);
        }
            
    };





    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                // const response = await PlannerAPI.get(`/?`);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, []);

    return(
        <div classNameName="main-body">
            <div className="grid grid-center">
                <div className="grid grid-center container">
                    <div className="title">My To-Do's</div>
                    <div className="grid input-div">
                        <input onChange={e => setInput(e.target.value)} className="input-box" placeholder="Add to do..." type="text"/>
                        <button onClick={() => addToDo()} className="to-do-button"><img src="../images/pencil-alt-solid.svg"/></button>
                    </div>
                    <div className="grid to-do-list">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToDoC;