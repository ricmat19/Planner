let inputBox = document.querySelector(".input-box");
let zero = document.querySelector(".zero");
let one = document.querySelector(".one");
let two = document.querySelector(".two");
let three = document.querySelector(".three");
let four = document.querySelector(".four");
let five = document.querySelector(".five");
let six = document.querySelector(".six");
let seven = document.querySelector(".seven");
let eight = document.querySelector(".eight");
let nine = document.querySelector(".nine");
let plus = document.querySelector(".plus");
let minus = document.querySelector(".minus");
let multiply = document.querySelector(".multiply");
let divide = document.querySelector(".divide");
let equal = document.querySelector(".equal");
let clear = document.querySelector(".clear");

let collecting1 = true;
let value1 = "";
let value2 = "";
let result = 0;
let calculation = "";

zero.addEventListener("click", function(){

    if(collecting1 === true && value1 !== ""){
        value1 += "0"
        inputBox.value = value1;
    }
    if(collecting1 === false && value2 !== ""){
        value2 += "0"
        inputBox.value = value2;
    }


})

one.addEventListener("click", function(){

    if(collecting1 === true){
        value1 += "1"
        inputBox.value = value1;
    }else{
        value2 += "1"
        inputBox.value = value2;
    }

})

two.addEventListener("click", function(){

    if(collecting1 === true){
        value1 += "2"
        inputBox.value = value1;
    }else{
        value2 += "2"
        inputBox.value = value2;
    }

})

three.addEventListener("click", function(){

    if(collecting1 === true){
        value1 += "3"
        inputBox.value = value1;
    }else{
        value2 += "3"
        inputBox.value = value2;
    }

})

four.addEventListener("click", function(){

    if(collecting1 === true){
        value1 += "4"
        inputBox.value = value1;
    }else{
        value2 += "4"
        inputBox.value = value2;
    }

})

five.addEventListener("click", function(){

    if(collecting1 === true){
        value1 += "5"
        inputBox.value = value1;
    }else{
        value2 += "5"
        inputBox.value = value2;
    }

})

six.addEventListener("click", function(){

    if(collecting1 === true){
        value1 += "6"
        inputBox.value = value1;
    }else{
        value2 += "6"
        inputBox.value = value2;
    }
    
})

seven.addEventListener("click", function(){

    if(collecting1 === true){
        value1 += "7"
        inputBox.value = value1;
    }else{
        value2 += "7"
        inputBox.value = value2;
    }

})

eight.addEventListener("click", function(){

    if(collecting1 === true){
        value1 += "8"
        inputBox.value = value1;
    }else{
        value2 += "8"
        inputBox.value = value2;
    }

})

nine.addEventListener("click", function(){

    if(collecting1 === true){
        value1 += "9"
        inputBox.value = value1;
    }else{
        value2 += "9"
        inputBox.value = value2;
    }

})

plus.addEventListener("click", function(){

    calculation = "+";

    if(collecting1 === true && value1 !== "0"){
        collecting1 = false;
    }

    if(collecting1 === false && value2 !=="" && value2 !=="0"){
        equalFunction();
    }

})

minus.addEventListener("click", function(){

    calculation = "-";

    if(collecting1 === true && value1 !== "0"){
        collecting1 = false;
    }

    if(collecting1 === false && value2 !=="" && value2 !=="0"){
        equalFunction();
    }

})

multiply.addEventListener("click", function(){

    calculation = "*";

    if(collecting1 === true && value1 !== "0"){
        collecting1 = false;
    }

    if(collecting1 === false && value2 !==""){
        equalFunction();
    }

})

divide.addEventListener("click", function(){

    calculation = "/";

    if(collecting1 === true && value1 !== "0"){
        collecting1 = false;
    }

    if(collecting1 === false && value2 !==""){
        equalFunction();
    }

})

equal.addEventListener("click", function(){

    equalFunction();

})

function equalFunction(){

    if(calculation === "+"){
        result = parseInt(value1, 10) + parseInt(value2, 10);
    }

    if(calculation === "-"){
        result = parseInt(value1, 10) - parseInt(value2, 10);
    }

    if(calculation === "*"){
        result = parseInt(value1, 10) * parseInt(value2, 10);
    }

    if(calculation === "/"){
        result = parseInt(value1, 10) / parseInt(value2, 10);
    }

    inputBox.value = result;

    value1 = result;
    value2 = "";
    result = 0;
}

clear.addEventListener("click", function(){

    inputBox.value
    collecting1 = true;
    value1 = "";
    value2 = "";
    result = 0;
    calculation = "";

})


