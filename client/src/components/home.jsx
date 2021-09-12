import React, { useEffect, useRef, useState } from 'react';
import CalculatorC from './calculator';
import CalendarC from './calendar';
import BooksC from './books';
import PlannerC from './planner';
import MapC from './map';


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

    const [booksModal, setBooksModal] = useState("modal");
    const booksRef = useRef();
    const displayBooks = () => {
        setBooksModal("modal modal-active");
    };

    const [mapModal, setMapModal] = useState("modal");
    const mapRef = useRef();
    const displayMap = () => {
        setMapModal("modal modal-active");
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
                        if(!booksRef.current.contains(event.target)){
                            setBooksModal("modal");
                        }
                        if(!mapRef.current.contains(event.target)){
                            setMapModal("modal");
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
            <div className={booksModal}>
                <div ref={booksRef} className="modal-content">
                    <BooksC calendarModal={booksModal} calendarRef={booksRef}/>
                </div>
            </div>
            <div className={mapModal}>
                <div ref={mapRef}>
                    <MapC mapModal={mapModal} mapRef={mapRef}/>
                </div>
            </div>

            <nav className="grid nav-div">
                <span className="nav-item">
                    <div className="nav-item-anchor" onClick={displayMap}>
                        <img src="../images/map-marked-alt-solid.svg"/>
                    </div>
                </span>
                <span className="nav-item">
                    <div className="nav-item-anchor" onClick={displayBooks}>
                        <img src="../images/book-solid.svg"/>
                    </div>
                </span>
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