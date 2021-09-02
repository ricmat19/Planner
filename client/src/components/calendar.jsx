import React, { useEffect, useState, useRef} from 'react';
import PlannerAPI from '../plannerAPI.js';


const CalendarC = (props) => {

    const [monthTitle, setMonthTitle] = useState('');
    const [dayBoxes, setDayBoxes] = useState([]);
    
    let currentWeekDay = new Date().getDay();
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let currentDay = new Date().getDate();
    let daysInMonth = "";
    let lastIndent = "";
    let monthChange = "";

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                // const response = await PlannerAPI.get(`/?`);
                displayMonth(currentMonth);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, []);

    function monthDays(year, month){

        return new Date(year, month, 0).getDate();

    }

    // function forwardIndent(indent, daysLastMonth){

    //     let lastIndentedMonth = indent + daysLastMonth;

    //     let remaining = 42 - lastIndentedMonth;

    //     if(remaining > 7){
    //         remaining -= 7;
    //     }

    //     let newIndent = 7 - remaining;

    //     for(let i = 0; i < newIndent; i++){

    //         dayBoxes += '<div class=""><div class="center-num"></div></div>';

    //     }

    //     return lastIndent = newIndent;

    // }

    // function backIndent(indent){

    //     let backIndent = 0;
    //     if(indent !== 0){
    //         backIndent = 7 - indent;
    //     }

    //     let boxSet = []
    //     for(let i = 0; i < backIndent; i++){

    //         dayBoxes.push('<div class=""><div class="center-num"></div></div>');

    //     }
    //     setDayBoxes(boxSet)

    //     let frontIndent = 0;

    //     if(dayBoxes.childElementCount > 35){
    //         frontIndent = 42 - dayBoxes.childElementCount;
    //     }else{
    //         frontIndent = 35 - dayBoxes.childElementCount;
    //     }

    //     let frontBoxes = "";

    //     for(let i = 0; i < frontIndent; i++){

    //         frontBoxes += '<div class=""><div class="center-num"></div></div>';

    //     }

    //     boxSet = []
    //     boxSet.push(frontBoxes)
    //     boxSet.push(dayBoxes)
    //     setDayBoxes(boxSet)

    //     lastIndent = frontIndent;

    // }

    function addCalBoxes(daysInMonth){

        let boxSet = []
        for(let i = 1; i <= daysInMonth; i++){

            let thisMonth = new Date().getMonth();
            let thisYear = new Date().getFullYear();

            if(i === currentDay && currentMonth === thisMonth && currentYear === thisYear){

                boxSet.push(<div class="day day-box day-today"><div class="center-num">{i}</div></div>);

            }else{

                boxSet.push(<div class="day day-box"><div class="center-num">{i}</div></div>);

            }
        }
        setDayBoxes(boxSet)
    }

    // document.addEventListener("keyup", function backArrow(){
    //     if(e.keyCode === 37){
    //         goBack();
    //     }
    // });

    const monthBack = () => {

        let newMonth = "";
        
        if(currentMonth === 0){
            newMonth = 11;
        }else{
            newMonth = currentMonth - 1;
        }

        monthChange = "back";

        currentMonth = newMonth;

        displayMonth(newMonth, monthChange);

    };

    // document.addEventListener("keyup", function forwardArrow(){
    //     if(e.keyCode === 39){
    //         goForward();
    //     }
    // });

    const monthForward = () => {

        let newMonth = "";
        
        if(currentMonth === 11){
            newMonth = 0;
        }else{
            newMonth = currentMonth + 1;
        }

        monthChange = "forward";

        currentMonth = newMonth;

        displayMonth(newMonth, monthChange);


    };

    function displayMonth(selectedMonth, change){

        switch(selectedMonth){
            case 0: 
                setMonthTitle("January" + " " + currentYear);
                setDayBoxes('');
                daysInMonth = monthDays(currentYear, 1);

                if(change === "forward"){
                    currentYear++;
                    setMonthTitle("January" + " " + currentYear);
                    // daysLastMonth =  monthDays(currentYear, 12);
                    // forwardIndent(lastIndent, daysLastMonth);
                    addCalBoxes(daysInMonth);
                }
                if(change === "back"){
                    console.log(currentYear)
                    addCalBoxes(daysInMonth);
                    // backIndent(lastIndent);
                }

                break;
            case 1: 
                setMonthTitle("Febuary" + " " + currentYear);
                setDayBoxes('');
                daysInMonth = monthDays(currentYear, 2);

                if(change === "forward"){
                    // daysLastMonth =  monthDays(currentYear, 1);
                    // forwardIndent(lastIndent, daysLastMonth);
                    addCalBoxes(daysInMonth);
                }
                if(change === "back"){
                    addCalBoxes(daysInMonth);
                    // backIndent(lastIndent);
                }
                break;
            case 2: 
                setMonthTitle("March" + " " + currentYear);
                setDayBoxes('');
                daysInMonth = monthDays(currentYear, 3);

                if(change === "forward"){
                    // daysLastMonth =  monthDays(currentYear, 2);
                    // forwardIndent(lastIndent, daysLastMonth);
                    addCalBoxes(daysInMonth);
                }
                if(change === "back"){
                    addCalBoxes(daysInMonth);
                    // backIndent(lastIndent);
                }

                break;
            case 3: 
                setMonthTitle("April" + " " + currentYear);
                setDayBoxes('');
                daysInMonth = monthDays(currentYear, 4);

                if(change === "forward"){
                    // daysLastMonth =  monthDays(currentYear, 3);
                    // forwardIndent(lastIndent, daysLastMonth);
                    addCalBoxes(daysInMonth);
                }
                if(change === "back"){
                    addCalBoxes(daysInMonth);
                    // backIndent(lastIndent);
                }

                break;
            case 4: 
                setMonthTitle("May" + " " + currentYear);
                setDayBoxes('');
                daysInMonth = monthDays(currentYear, 5);

                if(change === "forward"){
                    // daysLastMonth =  monthDays(currentYear, 4);
                    // forwardIndent(lastIndent, daysLastMonth);
                    addCalBoxes(daysInMonth);
                }
                if(change === "back"){
                    addCalBoxes(daysInMonth);
                    // backIndent(lastIndent);
                }

                break;
            case 5: 
                setMonthTitle("June" + " " + currentYear);
                setDayBoxes('');
                daysInMonth = monthDays(currentYear, 6);

                if(change === "forward"){
                    // daysLastMonth =  monthDays(currentYear, 5);
                    // forwardIndent(lastIndent, daysLastMonth);
                    addCalBoxes(daysInMonth);
                }
                if(change === "back"){
                    addCalBoxes(daysInMonth);
                    // backIndent(lastIndent);
                }

                break;
            case 6: 
                setMonthTitle("July" + " " + currentYear);
                setDayBoxes('');
                daysInMonth = monthDays(currentYear, 7);

                if(change === "forward"){
                    // daysLastMonth =  monthDays(currentYear, 6);
                    // forwardIndent(lastIndent, daysLastMonth);
                    addCalBoxes(daysInMonth);
                }
                if(change === "back"){
                    addCalBoxes(daysInMonth);
                    // backIndent(lastIndent);
                }

                break;
            case 7: 
                setMonthTitle("August" + " " + currentYear);
                setDayBoxes('');
                daysInMonth = monthDays(currentYear, 8);

                if(change === "forward"){
                    // daysLastMonth =  monthDays(currentYear, 7);
                    // forwardIndent(lastIndent, daysLastMonth);
                    addCalBoxes(daysInMonth);
                }
                if(change === "back"){
                    addCalBoxes(daysInMonth);
                    // backIndent(lastIndent);
                }

                break;
            case 8: 
                setMonthTitle("September" + " " + currentYear);
                setDayBoxes('');
                daysInMonth = monthDays(currentYear, 9);

                if(currentMonth === 8 && currentYear === 2020){
                    lastIndent = 6;
                    change = "forward"
                }

                if(change === "forward"){
                    // daysLastMonth =  monthDays(currentYear, 8);
                    // forwardIndent(lastIndent, daysLastMonth);
                    addCalBoxes(daysInMonth);
                }
                if(change === "back"){
                    addCalBoxes(daysInMonth);
                    // backIndent(lastIndent);
                }

                break;
            case 9: 
                setMonthTitle("October" + " " + currentYear);
                setDayBoxes('');
                daysInMonth = monthDays(currentYear, 10);

                if(change === "forward"){
                    // daysLastMonth =  monthDays(currentYear, 9);
                    // forwardIndent(lastIndent, daysLastMonth);
                    addCalBoxes(daysInMonth);
                }
                if(change === "back"){
                    addCalBoxes(daysInMonth);
                    // backIndent(lastIndent);
                }

                break;
            case 10: 
                setMonthTitle("November" + " " + currentYear);
                setDayBoxes('');
                daysInMonth = monthDays(currentYear, 11);

                if(change === "forward"){
                    // daysLastMonth =  monthDays(currentYear, 10);
                    // forwardIndent(lastIndent, daysLastMonth);
                    addCalBoxes(daysInMonth);
                }
                if(change === "back"){
                    addCalBoxes(daysInMonth);
                    // backIndent(lastIndent);
                }

                break;
            case 11: 
                setMonthTitle("December" + " " + currentYear);
                setDayBoxes('');
                daysInMonth = monthDays(currentYear, 12);

                if(change === "forward"){
                    // daysLastMonth =  monthDays(currentYear, 11);
                    // forwardIndent(lastIndent, daysLastMonth);
                    addCalBoxes(daysInMonth);
                }
                if(change === "back"){
                    currentYear--;
                    setMonthTitle("December" + " " + currentYear);
                    addCalBoxes(daysInMonth);
                    // backIndent(lastIndent);
                }

                break;
        }
    }

    // function addModals(dayBox){

    //     for(let i = 0; i < dayBox.length; i++){
    //         dayBox[i].addEventListener("click", function(){
    //             modal.style.display = "grid";
    //         })
    //     }
        
    //     modalClose.addEventListener("click", function(){
    //         modal.style.display = "none";
    //     })
        
    //     window.addEventListener("click", function(e){
    //         if(e.target === modal){
    //             modal.style.display = "none";
    //         }
    //     })

    // }

    return(
        <div className="main-body">
            <div className="grid grid-center">
                <div className="grid grid-center">
                    <div className="grid-center title">My Calendar</div>
                </div>
                <div className="month-row">
                    <div className="back-div">
                        <button onClick={() => monthBack()} className="month-back">
                            <img src="../images/angle-left-solid.svg"/>
                        </button>
                    </div>
                    <div className="month-title">{monthTitle}</div>
                    <div className="forward-div">
                        <button onClick={() => monthForward()} className="month-forward">
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
                    {dayBoxes}
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