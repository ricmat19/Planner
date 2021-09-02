import React, { useEffect, useRef, useState } from 'react';
import PlannerAPI from '../plannerAPI.js';


const CalculatorC = () => {

    const [firstValue, setFirstValue] = useState(null);
    const [secondValue, setSecondValue] = useState(null);
    const [currentInput, setCurrentInput] = useState(0);
    const [collectingFirstValue, setCollectingFirstValue] = useState(true);
    const [equation, setEquation] = useState(null);

    let result = 0;
    
    const enterNumber = (number) => {

        if((firstValue === null || firstValue === "0") && collectingFirstValue === true){
            setFirstValue(number);
            setCurrentInput(number)
            return;
        }

        if((secondValue === null || secondValue === "0") && collectingFirstValue === false){
            setSecondValue(number);
            setCurrentInput(number);
            return;
        }
    
        if(collectingFirstValue === true){
            let newValue = firstValue + number;
            setFirstValue(newValue);
            setCurrentInput(newValue)
        }else{
            let newValue = secondValue + number;
            setSecondValue(newValue);
            setCurrentInput(newValue)
        }
    }

    const equationType = (calculation) => {
        console.log(calculation)
        if(collectingFirstValue === true && firstValue !== "0"){
            setCollectingFirstValue(false);
        }
    
        if(collectingFirstValue === false && secondValue !== null){
            enterEqual(calculation);
        }
        setEquation(calculation)
    }
    
    const enterEqual = (calculation) => {

        console.log(firstValue)
        console.log(secondValue)
        console.log(calculation)
        console.log(equation)

        if(calculation === undefined){
            calculation = equation;
        }
    
        if(calculation === "+" && collectingFirstValue === false && secondValue !==""){
            result = parseFloat(firstValue, 10) + parseFloat(secondValue, 10);
        }
    
        if(calculation === "-" && collectingFirstValue === false && secondValue !==""){
            result = parseFloat(firstValue, 10) - parseFloat(secondValue, 10);
        }
    
        if(calculation === "*" && collectingFirstValue === false && secondValue !==""){
            result = parseFloat(firstValue, 10) * parseFloat(secondValue, 10);
        }
    
        if(calculation === "/" && collectingFirstValue === false && secondValue !==""){
            result = parseFloat(firstValue, 10) / parseFloat(secondValue, 10);
        }
    
        setCurrentInput(result);
        console.log(result)
    
        setFirstValue(result);
        setSecondValue(null);
        result = 0;
    }
    
    const enterClear = () => {
        setCurrentInput(0)
        setCollectingFirstValue(true);
        setFirstValue(null)
        setSecondValue(null)
        setEquation(null)
    }
    

    const keyPress = (e) => {
        if(e.key === 48){
            enterEqual("0")
        }
        if(e.key === 49){
            enterEqual("1")
        }
        if(e.key === 50){
            enterEqual("2")
        }
        if(e.key === 51){
            enterEqual("3")
        }
        if(e.key === 52){
            enterEqual("4")
        }
        if(e.key === 53){
            enterEqual("5")
        }
        if(e.key === 54){
            enterEqual("6")
        }
        if(e.key === 55){
            enterEqual("7")
        }
        if(e.key === 56){
            enterEqual("8")
        }
        if(e.key === 57){
            enterEqual("9")
        }
        if(e.key === 187){
            equation("+")
        }
        if(e.key === 189){
            equation("-")
        }
        if(e.key === 88){
            equation("*")
        }
        if(e.key === 191){
            equation("/")
        }
        if(e.key === 13){
            enterEqual()
        }
        if(e.key === 8 || e.key === 46){
            enterClear()
        }
    };

    return(
        <div className="main-body">
            <div className="title">Calculator</div>
            <div className="grid calculator-input-div">
                <input className="input-box" value={currentInput} type="text" readOnly/>
            </div>

            <div className="calculator">
                <div onClick={() => enterNumber("1")} className="button-box one">1</div>
                <div onClick={() => enterNumber("2")} className="button-box two">2</div>
                <div onClick={() => enterNumber("3")} className="button-box three">3</div>
                <div onClick={() => equationType("+")} className="button-box plus">+</div>
                <div onClick={() => enterNumber("4")} className="button-box four">4</div>
                <div onClick={() => enterNumber("5")} className="button-box five">5</div>
                <div onClick={() => enterNumber("6")} className="button-box six">6</div>
                <div onClick={() => equationType("-")} className="button-box minus">-</div>
                <div onClick={() => enterNumber("7")} className="button-box seven">7</div>
                <div onClick={() => enterNumber("8")} className="button-box eight">8</div>
                <div onClick={() => enterNumber("9")} className="button-box nine">9</div>
                <div onClick={() => equationType("*")} className="button-box multiply">x</div>
                <div onClick={() => enterNumber("0")} className="button-box zero">0</div>
                <div onClick={() => enterEqual()} className="button-box equal">=</div>
                <div onClick={() => enterClear()} className="button-box clear">C</div>
                <div onClick={() => equationType("/")} className="button-box divide">/</div>
            </div>
        </div>
    )
}

export default CalculatorC;