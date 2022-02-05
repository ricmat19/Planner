import React, { useState } from "react";

const CalculatorC = () => {
  const [firstValue, setFirstValue] = useState(null);
  const [secondValue, setSecondValue] = useState(null);
  const [currentInput, setCurrentInput] = useState(0);
  const [collectingFirstValue, setCollectingFirstValue] = useState(true);
  const [equation, setEquation] = useState(null);

  let result = 0;

  const enterNumber = (number) => {
    if (
      (firstValue === null || firstValue === "0") &&
      collectingFirstValue === true
    ) {
      setFirstValue(number);
      setCurrentInput(number);
      return;
    }

    if (
      (secondValue === null || secondValue === "0") &&
      collectingFirstValue === false
    ) {
      setSecondValue(number);
      setCurrentInput(number);
      return;
    }

    if (collectingFirstValue === true) {
      let newValue = firstValue + number;
      setFirstValue(newValue);
      setCurrentInput(newValue);
    } else {
      let newValue = secondValue + number;
      setSecondValue(newValue);
      setCurrentInput(newValue);
    }
  };

  const equationType = (calculation) => {
    if (collectingFirstValue === true && firstValue !== "0") {
      setCollectingFirstValue(false);
    }

    if (collectingFirstValue === false && secondValue !== null) {
      enterEqual(calculation);
    }
    setEquation(calculation);
  };

  const enterEqual = (calculation) => {
    if (calculation === undefined) {
      calculation = equation;
    }

    if (
      calculation === "+" &&
      collectingFirstValue === false &&
      secondValue !== ""
    ) {
      result = parseFloat(firstValue, 10) + parseFloat(secondValue, 10);
    }

    if (
      calculation === "-" &&
      collectingFirstValue === false &&
      secondValue !== ""
    ) {
      result = parseFloat(firstValue, 10) - parseFloat(secondValue, 10);
    }

    if (
      calculation === "*" &&
      collectingFirstValue === false &&
      secondValue !== ""
    ) {
      result = parseFloat(firstValue, 10) * parseFloat(secondValue, 10);
    }

    if (
      calculation === "/" &&
      collectingFirstValue === false &&
      secondValue !== ""
    ) {
      result = parseFloat(firstValue, 10) / parseFloat(secondValue, 10);
    }

    setCurrentInput(result);

    setFirstValue(result);
    setSecondValue(null);
    result = 0;
  };

  const enterClear = () => {
    setCurrentInput(0);
    setCollectingFirstValue(true);
    setFirstValue(null);
    setSecondValue(null);
    setEquation(null);
  };

  return (
    <div>
      <div className="title">Calculator</div>
      <div className="grid calculator-input-div">
        <input
          className="title input-box"
          value={currentInput}
          type="text"
          readOnly
        />
      </div>

      <div className="grid calculator">
        <button onClick={() => enterNumber("1")} className="calculator-button">
          1
        </button>
        <button onClick={() => enterNumber("2")} className="calculator-button">
          2
        </button>
        <button onClick={() => enterNumber("3")} className="calculator-button">
          3
        </button>
        <button onClick={() => equationType("+")} className="calculator-button">
          +
        </button>
        <button onClick={() => enterNumber("4")} className="calculator-button">
          4
        </button>
        <button onClick={() => enterNumber("5")} className="calculator-button">
          5
        </button>
        <button onClick={() => enterNumber("6")} className="calculator-button">
          6
        </button>
        <button onClick={() => equationType("-")} className="calculator-button">
          -
        </button>
        <button onClick={() => enterNumber("7")} className="calculator-button">
          7
        </button>
        <button onClick={() => enterNumber("8")} className="calculator-button">
          8
        </button>
        <button onClick={() => enterNumber("9")} className="calculator-button">
          9
        </button>
        <button onClick={() => equationType("*")} className="calculator-button">
          x
        </button>
        <button onClick={() => enterNumber("0")} className="calculator-button">
          0
        </button>
        <button onClick={() => enterEqual()} className="calculator-button">
          =
        </button>
        <button onClick={() => enterClear()} className="calculator-button">
          C
        </button>
        <button onClick={() => equationType("/")} className="calculator-button">
          /
        </button>
      </div>
    </div>
  );
};

export default CalculatorC;
