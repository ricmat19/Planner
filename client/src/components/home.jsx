import React, { useEffect, useRef, useState } from 'react';
import CalculatorC from './calculator';
import CalendarC from './calendar';
import PlannerC from './planner';


const NavbarC = () => {

    const [calculatorModal, setCalculatorModal] = useState("modal");
    const calculatorRef = useRef();
    const displayCalculator = () => {
        setCalculatorModal("modal modal-active");
    };

    const [calendarModal, setCalendarModal] = useState("modal");
    const calendarRef = useRef();
    const displayCalendar = () => {
        setCalendarModal("modal modal-active");
    };

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                document.addEventListener("mousedown", (event) => {
                    if(calculatorRef.current !== null && calendarRef.current !== null){
                        if(!calculatorRef.current.contains(event.target)){
                            setCalculatorModal("modal");
                        }
                        if(!calendarRef.current.contains(event.target)){
                            setCalendarModal("modal");
                        }
                    }
                })
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, []);

    return(
        <div className="main-body">

            <div className={calculatorModal}>
                <div ref={calculatorRef} className="modal-content">
                    <CalculatorC calculatorModal={calculatorModal} calculatorRef={calendarRef}/>
                </div>
            </div>
            <div className={calendarModal}>
                <div ref={calendarRef} className="modal-content">
                    <CalendarC calendarModal={calendarModal} calendarRef={calendarRef}/>
                </div>
            </div>

            <nav className="grid nav-div">
                <span className="nav-item">
                    <div className="nav-item-anchor" onClick={displayCalendar}>
                        <img src="../images/calendar-alt-solid.svg"/>
                    </div>
                </span>
                <span className="nav-item">
                    <div className="nav-item-anchor" onClick={displayCalculator}>
                        <img src="../images/calculator-solid.svg"/>
                    </div>
                </span>
            </nav>

            <PlannerC/>
            
        </div>
    )
}

export default NavbarC;