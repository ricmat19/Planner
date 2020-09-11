let button = document.querySelector(".modal-button");
let modal = document.querySelector(".modal");
let modalClose = document.querySelector(".modal-close");

button.addEventListener("click", function(){
    modal.style.display = "grid";
})

modalClose.addEventListener("click", function(){
    modal.style.display = "none";
})

window.addEventListener("click", function(e){
    if(e.target === modal){
        modal.style.display = "none";
    }
})