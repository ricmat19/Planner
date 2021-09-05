import React, { useEffect, useState } from 'react';
import NewEventModalC from './newEventModal';
import DeleteEventModalC from './deleteEventModal';


const CalendarC = () => {

    const [nav, setNav] = useState(0);
    const [clicked, setClicked] = useState();
    // const [events, setEvents] = useState(localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []);
    const [events, setEvents] = useState();
    const [days, setDays] = useState([]);
    const [dateDisplay, setDateDisplay] = useState('')
    // const className = `day ${day.value === 'padding' ? 'padding': ''} ${day.isCurrentDay ? 'currentDay' : ''}`;

    const eventForDate = date => events.find(e => e.date === date);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                localStorage.setItem('events', JSON.stringify(events))
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, [events]);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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
                    const dayString = `${month + 1}/${i - paddingDays}/${year}`;
                    console.log(dayString)
                    if(i > paddingDays){
                        daysArray.push({
                            value: i - paddingDays,
                            // event: eventForDate(dayString),
                            isCurrentDay: i - paddingDays === day && nav === 0,
                            date: dayString
                        })
                    }else{
                        daysArray.push({
                            value: 'padding',
                            // event: null,
                            isCurrentDay: false,
                            date: ''
                        })
                    }
                }
                setDays(daysArray);

            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, [events, nav]);

    return(
        <>
            <div className="main-body">
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
                        {/* {days.map((day, index) => (
                            <div className="day day-box" key={index} onClick={() => {day.value !== "padding" ? setClicked(day.date) : setClicked("")}}>
                                <div className="center-num">
                                    {day.value === 'padding' ? '' : day.value}
                                    {day.event && <div className='event'> {day.event.title}</div>}
                                </div>
                            </div>
                        ))} */}
                        {days.map((day, index) => (
                            <div>
                                {day.value === 'padding' ? '' :
                                    <div className="day day-box" key={index} onClick={() => {day.value !== "padding" ? setClicked(day.date) : setClicked("")}}>
                                        <div className="center-num">
                                            {day.value}
                                            {day.event && <div className='event'> {day.event.title}</div>}
                                        </div>
                                    </div>
                                }
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

            {/* {clicked && !eventForDate(clicked) && 
            <NewEventModalC
                onClose={() => setClicked(null)}
                onSave = {title => {
                    setEvents([...events, {title, date: clicked}]);
                    setClicked(null);
                }}
            />
            } */}

            {/* {clicked && eventForDate(clicked) && 
            <DeleteEventModalC
                eventText={eventForDate(clicked).title}
                onClose={() => setClicked(null)}
                onDelete = {title => {
                    setEvents(events.filter(e => e.date !== clicked));
                    setClicked(null);
                }}
            />
            } */}
            </>
    )
}

export default CalendarC;