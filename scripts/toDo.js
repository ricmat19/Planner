let inputText = document.querySelector(".input-box");
let toDoList = document.querySelector(".to-do-list");
let addButton = document.querySelector(".to-do-button");

addButton.addEventListener("click", addToDo);

inputText.addEventListener("keyup", function enterToDo(){
    if(event.keyCode === 13){
        addToDo();
    }
});

function addToDo(){
    toDoItem = document.querySelector(".to-do-item");

    if (inputText.value !== ""){
        toDoList.innerHTML += '<div class="grid to-do-item"><div class="to-do-item-name">' + inputText.value + '</div><div class="to-do-delete">X</div></div>'
    }

    inputText.value = "";

};

toDoList.addEventListener("click", function deleteToDo(e){
    
    let elementClicked = e.target;

    //
    if(elementClicked.classList[0] === "to-do-delete"){

        let removedToDo = elementClicked.parentElement;

        removedToDo.remove();
    }
        
});




