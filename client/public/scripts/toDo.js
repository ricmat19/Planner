let inputText = document.querySelector(".input-box");
let toDoList = document.querySelector(".to-do-list");
let addButton = document.querySelector(".to-do-button");
let toDoKey = 0;
let highestKey = 0;

addButton.addEventListener("click", addToDo);

inputText.addEventListener("keyup", function enterToDo(){
    if(event.keyCode === 13){
        addToDo();
    }
});

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

            toDoList.innerHTML += '<div class="grid to-do-item"><div class="to-do-item-name">' + localStorage.getItem(i) + '</div><div id ="' + i + '" class="to-do-delete">X</div></div>';

        }

    }

    toDoKey = highestKey;

}

getToDos();

function addToDo(){

    toDoItem = document.querySelector(".to-do-item");

    if (inputText.value !== ""){

        toDoKey++;

        toDoList.innerHTML += '<div class="grid to-do-item"><div class="to-do-item-name">' + inputText.value + '</div><div id ="' + toDoKey + '" class="to-do-delete">X</div></div>';

        localStorage.setItem(toDoKey, inputText.value);
    }

    inputText.value = "";

};

toDoList.addEventListener("click", function deleteToDo(e){
    
    let elementClicked = e.target;

    if(elementClicked.classList[0] === "to-do-delete"){

        let removedToDo = elementClicked.parentElement;

        removedToDo.remove();

        let elementRemoved = elementClicked.getAttribute('id');

        console.log(elementRemoved);

        localStorage.removeItem(elementRemoved);
    }
        
});



