import React, { useState } from 'react';

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
        if(collectingFirstValue === true && firstValue !== "0"){
            setCollectingFirstValue(false);
        }
    
        if(collectingFirstValue === false && secondValue !== null){
            enterEqual(calculation);
        }
        setEquation(calculation)
    }
    
    const enterEqual = (calculation) => {

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
                <input className="title input-box calculator-input-box" value={currentInput} type="text" readOnly/>
            </div>

            <div className="grid calculator">
                <button onClick={() => enterNumber("1")} className="title calculator-button one">1</button>
                <button onClick={() => enterNumber("2")} className="title calculator-button two">2</button>
                <button onClick={() => enterNumber("3")} className="title calculator-button three">3</button>
                <button onClick={() => equationType("+")} className="title calculator-button plus">+</button>
                <button onClick={() => enterNumber("4")} className="title calculator-button four">4</button>
                <button onClick={() => enterNumber("5")} className="title calculator-button five">5</button>
                <button onClick={() => enterNumber("6")} className="title calculator-button six">6</button>
                <button onClick={() => equationType("-")} className="title calculator-button minus">-</button>
                <button onClick={() => enterNumber("7")} className="title calculator-button seven">7</button>
                <button onClick={() => enterNumber("8")} className="title calculator-button eight">8</button>
                <button onClick={() => enterNumber("9")} className="title calculator-button nine">9</button>
                <button onClick={() => equationType("*")} className="title calculator-button multiply">x</button>
                <button onClick={() => enterNumber("0")} className="title calculator-button zero">0</button>
                <button onClick={() => enterEqual()} className="title calculator-button equal">=</button>
                <button onClick={() => enterClear()} className="title calculator-button clear">C</button>
                <button onClick={() => equationType("/")} className="title calculator-button divide">/</button>
            </div>
        </div>
    )
}

export default CalculatorC;