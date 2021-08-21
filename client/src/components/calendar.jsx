import React, { useEffect, useState } from 'react';
import PlannerAPI from '../plannerAPI.js';


const CalendarC = () => {

    // const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchData = async (req, res) => {
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
                    <div className="grid grid-center">
                        <div className="grid-center title">My Calendar</div>
                    </div>
                    <div className="month-row">
                        <div className="back-div">
                            <button className="month-back">
                                <img src="../images/angle-left-solid.svg"/>
                            </button>
                        </div>
                        <div className="month-title"></div>
                        <div className="forward-div">
                            <button className="month-forward">
                                <img src="../images/angle-right-solid.svg"/>
                            </button>
                        </div>
                    </div>
                    <div className="day-names">
                        <div className="day day-name">Sun</div>
                        <div className="day day-name">Mon</div>
                        <div className="day day-name">Tue</div>
                        <div className="day day-name">Wed</div>
                        <div className="day day-name">Thur</div>
                        <div className="day day-name">Fri</div>
                        <div className="day day-name">Sat</div>
                    </div>
                    <div className="day-boxes">
                    </div>
                </div>
                <div className="grid grid-center modal">
                    <div className="grid grid-center modal-content container">
                        <div className="grid modal-title-div">
                            <div className="title modal-title">My Modal</div>
                            <div className="modal-close">&times;</div>
                        </div>
                        <div className="modal-body">
                            <div>Random Text</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CalendarC;