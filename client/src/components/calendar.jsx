import React, { useEffect, useRef, useState } from 'react';
import PlannerAPI from '../plannerAPI';
import CalendarToDoC from './calendarToDo';



const CalendarC = () => {

    const [nav, setNav] = useState(0);
    const [clicked, setClicked] = useState();
    const [toDos, setToDos] = useState();
    const [days, setDays] = useState([]);
    const [dateDisplay, setDateDisplay] = useState('')
    const [daysToDosModal, setDaysToDosModal] = useState("modal");
    const [selectedDay, setSelectedDay] = useState('')
    const [daysToDos, setDaysToDos] = useState([])

    const daysToDosRef = useRef();

    // const toDoForDate = (date) => {
    //     for(let i = 0; i < toDos.length; i++){
    //         if(toDos[i].dueDate === date){
    //             return daysToDo = toDos[i].todo;
    //         }
    //     }
    // }

    const toDoForDate = (date) => {
        let daysToDos = [];
        for(let i = 0; i < toDos.length; i++){
            if(toDos[i].dueDate === date){
                daysToDos.push(toDos[i].todo)
            }
        }
        return daysToDos;
    }

    const displayToDoModal = (day) => {
        console.log(day)
        if(day.toDo.length > 0){
            setDaysToDosModal("modal modal-active");
            setSelectedDay(day.date)
        }
    };

    const toDosArray = [];

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{

                document.addEventListener("mousedown", (event) => {
                    if(daysToDosRef.current !== null){
                        if(!daysToDosRef.current.contains(event.target)){
                            setDaysToDosModal("modal");
                        }
                    }
                })

            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                const toDosResponse = await PlannerAPI.get(`/planner`);
                for(let i=0; i < toDosResponse.data.data.toDos.length; i++){
                    toDosArray.push(toDosResponse.data.data.toDos[i])
                }
                setToDos(toDosArray);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, [toDos]);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

                const currentDate = new Date();
                const currentDay = currentDate.getDate();
                const currentMonth = currentDate.getMonth() + 1;
                const currentYear = currentDate.getFullYear();

                const date = new Date();

                if(nav !== 0){
                    date.setMonth(new Date().getMonth() + nav);
                }

                const day = date.getDate();
                const month = date.getMonth();
                const year = date.getFullYear();

                const firstMonthDay = new Date(year, month, 1);
                const daysInMonth = new Date(year, month + 1, 0).getDate();

                const dateString = firstMonthDay.toLocaleDateString('en-us', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                });
                
                setDateDisplay(`${date.toLocaleDateString('en-us', {month: 'long'})} ${year}`);

                const paddingDays = weekdays.indexOf(dateString.split(', ')[0])

                const daysArray = [];
                for(let i = 1; i <= paddingDays + daysInMonth; i++){

                    let dayStringYear = year.toString();
                    let dayStringMonth = month + 1;
                    if(dayStringMonth.toString().length === 1){
                        dayStringMonth = "0" + dayStringMonth.toString();
                    }
                    let dayStringDay = i - paddingDays;
                    if(dayStringDay.toString().length === 1){
                        dayStringDay = "0" + dayStringDay.toString();
                    }

                    let todayDayString = currentDay.toString()
                    if(todayDayString.length === 1){
                        todayDayString = "0" + todayDayString;
                    }
                    let todayMonthString = currentMonth.toString()
                    if(todayMonthString.length === 1){
                        todayMonthString = "0" + todayMonthString;
                    }
                    let todayYearString = currentYear.toString()

                    const dayString = `${dayStringYear}-${dayStringMonth.toString()}-${dayStringDay.toString()}`;
                    const today = `${todayYearString}-${todayMonthString}-${todayDayString}`;
                    if(i > paddingDays){
                        daysArray.push({
                            value: i - paddingDays,
                            toDo: toDoForDate(dayString),
                            date: dayString,
                            today: today
                        })

                    }else{
                        daysArray.push({
                            value: 'padding',
                            toDo: null,
                            date: '',
                            today: ''
                        })
                    }
                }
                setDays(daysArray);

            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, [toDos, nav]);

    return(
        <div className="main-body">

            {/* Day's To Do's */}
            <div className={daysToDosModal}>
                <form>
                    <div ref={daysToDosRef} className="modal-content">
                        <CalendarToDoC days={days} selectedDay={selectedDay}/>
                    </div>
                </form>
            </div>

            <div className="grid grid-center">
                <div className="month-row">
                    <div className="back-div">
                        <button onClick={() => setNav(nav - 1)} className="month-back">
                            <img src="../images/angle-left-solid.svg"/>
                        </button>
                    </div>
                    <div className="month-title">{dateDisplay}</div>
                    <div className="forward-div">
                        <button onClick={() => setNav(nav + 1)} className="month-forward">
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
                    {days.map((day, index) => (
                        <div key={index}>
                            {day.value === 'padding' ? '' : day.toDo.length > 0 && day.date === day.today ?
                                <div className="day day-box day-box-task-today" onClick={() => {day.value !== "padding" ? 
                                setClicked(day.date) : setClicked("")}}>
                                    <div onClick={() => displayToDoModal(day)} className="center-num">
                                        {day.value}
                                    </div>
                                </div>: day.date === day.today ?
                                <div className="day day-box day-today" onClick={() => {day.value !== "padding" ? setClicked(day.date) : setClicked("")}}>
                                    <div onClick={() => displayToDoModal(day)} className="center-num">
                                        {day.value}
                                    </div>
                                </div>: day.toDo.length > 0 ?
                                <div className="day day-box day-box-task" onClick={() => {day.value !== "padding" ? setClicked(day.date) : setClicked("")}}>
                                    <div onClick={() => displayToDoModal(day)} className="center-num">
                                        {day.value}
                                    </div>
                                </div>:                         
                                <div className="day day-box" onClick={() => {day.value !== "padding" ? setClicked(day.date) : setClicked("")}}>
                                    <div onClick={() => displayToDoModal(day)} className="center-num">
                                        {day.value}
                                    </div>
                            </div>}
                        </div>
                    ))}
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