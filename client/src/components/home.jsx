import React, { useEffect, useRef, useState } from 'react';
import CalculatorC from './calculator';
import CalendarC from './calendar';
import BooksC from './books';
import PlannerC from './planner';
import MapC from './map';
import GoogleDriveC from './googleDrive';
import EventsC from './events';


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

    const [driveModal, setDriveModal] = useState("modal");
    const driveRef = useRef();
    const displayDrive = () => {
        setDriveModal("modal modal-active");
    };

    const [eventsModal, setEventsModal] = useState("modal");
    const eventsRef = useRef();
    const displayEvents = () => {
        setEventsModal("modal modal-active");
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
                        if(!driveRef.current.contains(event.target)){
                            setDriveModal("modal");
                        }
                        if(!eventsRef.current.contains(event.target)){
                            setEventsModal("modal");
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
            <div className={driveModal}>
                <div ref={driveRef} className="modal-content google-drive-modal">
                    <GoogleDriveC driveModal={driveModal} driveRef={driveRef}/>
                </div>
            </div>
            <div className={eventsModal}>
                <div ref={eventsRef} className="modal-content google-drive-modal">
                    <EventsC eventsModal={eventsModal} eventsRef={eventsRef}/>
                </div>
            </div>

            <nav className="grid nav-div">
                <span className="nav-item">
                    <div className="nav-item-anchor" onClick={displayEvents}>
                        <img src="../images/calendar-check-solid.svg"/>
                    </div>
                </span>
                <span className="nav-item">
                    <div className="nav-item-anchor" onClick={displayDrive}>
                        <img src="../images/folder-open-solid.svg"/>
                    </div>
                </span>
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