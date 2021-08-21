import React, { useEffect, useState } from 'react';
import PlannerAPI from '../plannerAPI.js';


const CalculatorC = () => {

    const [inputValue, setInputValue] = useState(0)

    let collecting1 = true;
    let value1 = "";
    let value2 = "";
    let result = 0;
    let calculation = "";

    const enterZero = (e) => {

        console.log(value1)
        console.log(value2)
        if(value1 === "" && collecting1 === true){
            value1 = "0"
        }
        if(value2 === "" && collecting1 === false){
            value2 = "0"
        }
    
        if(collecting1 === true && value1 !== "" && value1 !== "0"){
            value1 += "0"
            setInputValue(value1);
        }
        if(collecting1 === false && value2 !== "" && value2 !== "0"){
            value2 += "0"
            setInputValue(value2);
        }
    
    }
    
    // document.addEventListener("keyup", function numEnter(){
    //     if(e.key === 48){
    //         enterZero()
    //     }
    // });
    
    const enterOne = (e) => {

        if(value1 === "0" && collecting1 === true){
            value1 = "1";
            setInputValue(value1);
            return;
        }
        if(value2 === "0" && collecting1 === false){
            value2 = "1";
            setInputValue(value2);
            return;
        }
    
        if(collecting1 === true){
            value1 += "1"
            setInputValue(value1);
        }else{
            value2 += "1"
            setInputValue(value2);
        }
    }
    
    // document.addEventListener("keyup", function numEnter(e){
    //     if(e.key === 49){
    //         enterOne()
    //     }
    // });
    
    const enterTwo = (e) => {
    
        if(value1 === "0" && collecting1 === true){
            value1 = "2"
            setInputValue(value1);
            return;
        }
        if(value2 === "0" && collecting1 === false){
            value2 = "2"
            setInputValue(value2);
            return;
        }
    
        if(collecting1 === true){
            value1 += "2"
            setInputValue(value1);
        }else{
            value2 += "2"
            setInputValue(value2);
        }
    
    }
    
    // document.addEventListener("keyup", function numEnter(e){
    //     if(e.key === 50){
    //         enterTwo()
    //     }
    // });
    
    const enterThree = (e) => {
    
        if(value1 === "0" && collecting1 === true){
            value1 = "3"
            setInputValue(value1);
            return;
        }
        if(value2 === "0" && collecting1 === false){
            value2 = "3"
            setInputValue(value2);
            return;
        }
    
        if(collecting1 === true){
            value1 += "3"
            setInputValue(value1);
        }else{
            value2 += "3"
            setInputValue(value2);
        }
    
    }
    
    // document.addEventListener("keyup", function numEnter(e){
    //     if(e.key === 51){
    //         enterThree()
    //     }
    // });
    
    const enterFour = (e) => {
    
        if(value1 === "0" && collecting1 === true){
            value1 = "4"
            setInputValue(value1);
            return;
        }
        if(value2 === "0" && collecting1 === false){
            value2 = "4"
            setInputValue(value2);
            return;
        }
    
        if(collecting1 === true){
            value1 += "4"
            setInputValue(value1);
        }else{
            value2 += "4"
            setInputValue(value2);
        }
    
    }
    
    // document.addEventListener("keyup", function numEnter(e){
    //     if(e.key === 52){
    //         enterFour()
    //     }
    // });
    
    const enterFive = (e) => {
    
        if(value1 === "0" && collecting1 === true){
            value1 = "5"
            setInputValue(value1);
            return;
        }
        if(value2 === "0" && collecting1 === false){
            value2 = "5"
            setInputValue(value2);
            return;
        }
    
        if(collecting1 === true){
            value1 += "5"
            setInputValue(value1);
        }else{
            value2 += "5"
            setInputValue(value2);
        }
    
    }
    
    // document.addEventListener("keyup", function numEnter(e){
    //     if(e.key === 53){
    //         enterFive();
    //     }
    // });
    
    const enterSix = (e) => {
    
        if(value1 === "0" && collecting1 === true){
            value1 = "6"
            setInputValue(value1);
            return;
        }
        if(value2 === "0" && collecting1 === false){
            value2 = "6"
            setInputValue(value2);
            return;
        }
    
        if(collecting1 === true){
            value1 += "6"
            setInputValue(value1);
        }else{
            value2 += "6"
            setInputValue(value2);
        }
        
    }
    
    // document.addEventListener("keyup", function numEnter(e){
    //     if(e.key === 54){
    //         enterSix()
    //     }
    // });
    
    const enterSeven = (e) => {
    
        if(value1 === "0" && collecting1 === true){
            value1 = "7"
            setInputValue(value1);
            return;
        }
        if(value2 === "0" && collecting1 === false){
            value2 = "7"
            setInputValue(value2);
            return;
        }
    
        if(collecting1 === true){
            value1 += "7"
            setInputValue(value1);
        }else{
            value2 += "7"
            setInputValue(value2);
        }
    
    }
    
    // document.addEventListener("keyup", function numEnter(e){
    //     if(e.key === 55){
    //         enterSeven()
    //     }
    // });
    
    const enterEight = (e) => {
    
        if(value1 === "0" && collecting1 === true){
            value1 = "8"
            setInputValue(value1);
            return;
        }
        if(value2 === "0" && collecting1 === false){
            value2 = "8"
            setInputValue(value2);
            return;
        }
    
        if(collecting1 === true){
            value1 += "8"
            setInputValue(value1);
        }else{
            value2 += "8"
            setInputValue(value2);
        }
    
    }
    
    // document.addEventListener("keyup", function numEnter(e){
    //     if(e.key === 56){
    //         enterEight()
    //     }
    // });
    
    const enterNine = (e) => {
    
        if(value1 === "0" && collecting1 === true){
            value1 = "9"
            setInputValue(value1);
            return;
        }
        if(value2 === "0" && collecting1 === false){
            value2 = "9"
            setInputValue(value2);
            return;
        }
    
        if(collecting1 === true){
            value1 += "9"
            setInputValue(value1);
        }else{
            value2 += "9"
            setInputValue(value2);
        }
    
    }
    
    // document.addEventListener("keyup", function numEnter(e){
    //     if(e.key === 57){
    //         enterNine()
    //     }
    // });
    
    const enterPlus = (e) => {
    
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
    
    // document.addEventListener("keyup", function numEnter(e){
    //     if(e.key === 187){
    //         enterPlus()
    //     }
    // });
    
    const enterMinus = (e) => {
    
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
    
    // document.addEventListener("keyup", function numEnter(e){
    //     if(e.key === 189){
    //         enterMinus()
    //     }
    // });
    
    const enterMultiply = (e) => {
    
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
    
    // document.addEventListener("keyup", function numEnter(e){
    //     if(e.key === 88){
    //         enterMultiply()
    //     }  
    // });
    
    const enterDivide = (e) => {
    
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
    
    // document.addEventListener("keyup", function numEnter(e){
    //     if(e.key === 191){
    //         enterDivide()
    //     }
    // });
    
    const enterEqual = (e) => {
    
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
    
        e = result;
    
        value1 = result;
        value2 = "";
        result = 0;
    }
    
    // document.addEventListener("keyup", function numEnter(e){
    //     if(e.key === 13){
    //         enterEqual()
    //     }
    // });
    
    const enterClear = (e) => {
        e = "0"
        collecting1 = true;
        value1 = "";
        value2 = "";
        result = 0;
        calculation = "";
    }
    
    // document.addEventListener("keyup", function numEnter(e){
    //     if(e.key === 8 || e.key === 46){
    //         enterClear()
    //     }
    // });

    // const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchData =  (req, res) => {
            try{
                // const response = await PlannerAPI.get(`/?`);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, []);


    return(
        <div className="main-body">
            <div className="grid grid-center">
                <div className="container">

                    <div className="title">My Calculator</div>

                    <div>
                        <div className="grid input-div">
                            <input className="input-box" value={inputValue} type="text" readOnly/>
                        </div>

                        <div className="calculator">
                            <div onClick={() => enterOne(1)} className="button-box one">1</div>
                            <div onClick={() => enterTwo(2)} className="button-box two">2</div>
                            <div onClick={() => enterThree(3)} className="button-box three">3</div>
                            <div onClick={() => enterPlus} className="button-box plus">+</div>
                            <div onClick={() => enterFour(4)} className="button-box four">4</div>
                            <div onClick={() => enterFive(5)} className="button-box five">5</div>
                            <div onClick={() => enterSix(6)} className="button-box six">6</div>
                            <div onClick={() => enterMinus} className="button-box minus">-</div>
                            <div onClick={() => enterSeven(7)} className="button-box seven">7</div>
                            <div onClick={() => enterEight(8)} className="button-box eight">8</div>
                            <div onClick={() => enterNine(9)} className="button-box nine">9</div>
                            <div onClick={() => enterMultiply} className="button-box multiply">x</div>
                            <div onClick={() => enterZero(0)} className="button-box zero">0</div>
                            <div onClick={() => enterEqual} className="button-box equal">=</div>
                            <div onClick={() => enterClear} className="button-box clear">C</div>
                            <div onClick={() => enterDivide} className="button-box divide">/</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CalculatorC;