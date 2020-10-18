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

function enterZero(){

    if(value1 === "" && collecting1 === true){
        value1 = "0"
    }
    if(value2 === "" && collecting1 === false){
        value2 = "0"
    }

    if(collecting1 === true && value1 !== "" && value1 !== "0"){
        value1 += "0"
        inputBox.value = value1;
    }
    if(collecting1 === false && value2 !== "" && value2 !== "0"){
        value2 += "0"
        inputBox.value = value2;
    }

}

zero.addEventListener("click", function(){
    enterZero()
})

document.addEventListener("keyup", function numEnter(){
    if(event.keyCode === 48){
        enterZero()
    }
});

function enterOne(){

    if(value1 === "0" && collecting1 === true){
        value1 = "1";
        inputBox.value = value1;
        return;
    }
    if(value2 === "0" && collecting1 === false){
        value2 = "1";
        inputBox.value = value2;
        return;
    }

    if(collecting1 === true){
        value1 += "1"
        inputBox.value = value1;
    }else{
        value2 += "1"
        inputBox.value = value2;
    }

}

one.addEventListener("click", function(){
    enterOne()
})

document.addEventListener("keyup", function numEnter(){
    if(event.keyCode === 49){
        enterOne()
    }
});

function enterTwo(){

    if(value1 === "0" && collecting1 === true){
        value1 = "2"
        inputBox.value = value1;
        return;
    }
    if(value2 === "0" && collecting1 === false){
        value2 = "2"
        inputBox.value = value2;
        return;
    }

    if(collecting1 === true){
        value1 += "2"
        inputBox.value = value1;
    }else{
        value2 += "2"
        inputBox.value = value2;
    }

}

two.addEventListener("click", function(){
    enterTwo()
})

document.addEventListener("keyup", function numEnter(){
    if(event.keyCode === 50){
        enterTwo()
    }
});

function enterThree(){

    if(value1 === "0" && collecting1 === true){
        value1 = "3"
        inputBox.value = value1;
        return;
    }
    if(value2 === "0" && collecting1 === false){
        value2 = "3"
        inputBox.value = value2;
        return;
    }

    if(collecting1 === true){
        value1 += "3"
        inputBox.value = value1;
    }else{
        value2 += "3"
        inputBox.value = value2;
    }

}

three.addEventListener("click", function(){
    enterThree()
})

document.addEventListener("keyup", function numEnter(){
    if(event.keyCode === 51){
        enterThree()
    }
});

function enterFour(){

    if(value1 === "0" && collecting1 === true){
        value1 = "4"
        inputBox.value = value1;
        return;
    }
    if(value2 === "0" && collecting1 === false){
        value2 = "4"
        inputBox.value = value2;
        return;
    }

    if(collecting1 === true){
        value1 += "4"
        inputBox.value = value1;
    }else{
        value2 += "4"
        inputBox.value = value2;
    }

}

four.addEventListener("click", function(){
    enterFour()
})

document.addEventListener("keyup", function numEnter(){
    if(event.keyCode === 52){
        enterFour()
    }
});

function enterFive(){

    if(value1 === "0" && collecting1 === true){
        value1 = "5"
        inputBox.value = value1;
        return;
    }
    if(value2 === "0" && collecting1 === false){
        value2 = "5"
        inputBox.value = value2;
        return;
    }

    if(collecting1 === true){
        value1 += "5"
        inputBox.value = value1;
    }else{
        value2 += "5"
        inputBox.value = value2;
    }

}

five.addEventListener("click", function(){
    enterFive();
})

document.addEventListener("keyup", function numEnter(){
    if(event.keyCode === 53){
        enterFive();
    }
});

function enterSix(){

    if(value1 === "0" && collecting1 === true){
        value1 = "6"
        inputBox.value = value1;
        return;
    }
    if(value2 === "0" && collecting1 === false){
        value2 = "6"
        inputBox.value = value2;
        return;
    }

    if(collecting1 === true){
        value1 += "6"
        inputBox.value = value1;
    }else{
        value2 += "6"
        inputBox.value = value2;
    }
    
}

six.addEventListener("click", function(){
    enterSix()
})

document.addEventListener("keyup", function numEnter(){
    if(event.keyCode === 54){
        enterSix()
    }
});

function enterSeven(){

    if(value1 === "0" && collecting1 === true){
        value1 = "7"
        inputBox.value = value1;
        return;
    }
    if(value2 === "0" && collecting1 === false){
        value2 = "7"
        inputBox.value = value2;
        return;
    }

    if(collecting1 === true){
        value1 += "7"
        inputBox.value = value1;
    }else{
        value2 += "7"
        inputBox.value = value2;
    }

}

seven.addEventListener("click", function(){
    enterSeven()
})

document.addEventListener("keyup", function numEnter(){
    if(event.keyCode === 55){
        enterSeven()
    }
});

function enterEight(){

    if(value1 === "0" && collecting1 === true){
        value1 = "8"
        inputBox.value = value1;
        return;
    }
    if(value2 === "0" && collecting1 === false){
        value2 = "8"
        inputBox.value = value2;
        return;
    }

    if(collecting1 === true){
        value1 += "8"
        inputBox.value = value1;
    }else{
        value2 += "8"
        inputBox.value = value2;
    }

}

eight.addEventListener("click", function(){
    enterEight()
})

document.addEventListener("keyup", function numEnter(){
    if(event.keyCode === 56){
        enterEight()
    }
});

function enterNine(){

    if(value1 === "0" && collecting1 === true){
        value1 = "9"
        inputBox.value = value1;
        return;
    }
    if(value2 === "0" && collecting1 === false){
        value2 = "9"
        inputBox.value = value2;
        return;
    }

    if(collecting1 === true){
        value1 += "9"
        inputBox.value = value1;
    }else{
        value2 += "9"
        inputBox.value = value2;
    }

}

nine.addEventListener("click", function(){
    enterNine()
})

document.addEventListener("keyup", function numEnter(){
    if(event.keyCode === 57){
        enterNine()
    }
});

function enterPlus(){

    calculation = "+";

    if(collecting1 === true && value1 !== "0"){
        collecting1 = false;
    }

    if(collecting1 === false && value2 !==""){
        enterEqual();
    }

    console.log("Value1:" + value1);
    console.log("Value2:" + value2);
    console.log("Result:" + result);

}

plus.addEventListener("click", function(){
    enterPlus()
})

document.addEventListener("keyup", function numEnter(){
    if(event.keyCode === 187){
        enterPlus()
    }
});

function enterMinus(){

    calculation = "-";

    if(collecting1 === true && value1 !== "0"){
        collecting1 = false;
    }

    if(collecting1 === false && value2 !==""){
        enterEqual();
    }

    console.log("Value1:" + value1);
    console.log("Value2:" + value2);
    console.log("Result:" + result);

}

minus.addEventListener("click", function(){
    enterMinus()
})

document.addEventListener("keyup", function numEnter(){
    if(event.keyCode === 189){
        enterMinus()
    }
});

function enterMultiply(){

    calculation = "*";

    if(collecting1 === true){
        collecting1 = false;
    }

    if(collecting1 === false && value2 !==""){
        enterEqual();
    }

    console.log("Value1:" + value1);
    console.log("Value2:" + value2);
    console.log("Result:" + result);

}

multiply.addEventListener("click", function(){
    enterMultiply()
})

document.addEventListener("keyup", function numEnter(){
    if(event.keyCode === 88){
        enterMultiply()
    }  
});

function enterDivide(){

    calculation = "/";

    if(collecting1 === true && value1 !== "0"){
        collecting1 = false;
    }

    if(collecting1 === false && value2 !==""){
        enterEqual();
    }

    console.log("Value1:" + value1);
    console.log("Value2:" + value2);
    console.log("Result:" + result);

}

divide.addEventListener("click", function(){
    enterDivide()
})

document.addEventListener("keyup", function numEnter(){
    if(event.keyCode === 191){
        enterDivide()
    }
});

function enterEqual(){

    if(calculation === "+" && collecting1 === false && value2 !==""){
        result = parseFloat(value1, 10) + parseFloat(value2, 10);
    }

    if(calculation === "-" && collecting1 === false && value2 !==""){
        result = parseFloat(value1, 10) - parseFloat(value2, 10);
    }

    if(calculation === "*" && collecting1 === false && value2 !==""){
        result = parseFloat(value1, 10) * parseFloat(value2, 10);
    }

    if(calculation === "/" && collecting1 === false && value2 !==""){
        result = parseFloat(value1, 10) / parseFloat(value2, 10);
    }
    
    console.log("Value1:" + value1);
    console.log("Value2:" + value2);
    console.log("Result:" + result);

    inputBox.value = result;

    value1 = result;
    value2 = "";
    result = 0;
}

equal.addEventListener("click", function(){
    enterEqual();
})

document.addEventListener("keyup", function numEnter(){
    if(event.keyCode === 13){
        enterEqual()
    }
});

function enterClear(){
    inputBox.value = "0"
    collecting1 = true;
    value1 = "";
    value2 = "";
    result = 0;
    calculation = "";
}

clear.addEventListener("click", function(){
    enterClear();
})

document.addEventListener("keyup", function numEnter(){
    if(event.keyCode === 8 || event.keyCode === 46){
        enterClear()
    }
});


