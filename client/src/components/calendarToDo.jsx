import React, { useEffect, useState } from 'react';


const CalendarToDoC = (props) => {

    const [year, setYear] = useState('')
    const [month, setMonth] = useState('')
    const [day, setDay] = useState('')
    const [daysToDos, setDaysToDos] = useState([])

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                
                setMonth(props.selectedDay.slice(5, 7))
                setDay(props.selectedDay.slice(8, 10))
                setYear(props.selectedDay.slice(0, 4))
                
                let toDosArray = []
                for(let i=0; i < props.days.length; i++){
                    if(props.selectedDay === props.days[i].date){
                        toDosArray.push(props.days[i].toDo)
                    }
                }
                setDaysToDos(...toDosArray)

            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, [props.selectedDay]);

    if(daysToDos){
        return(
            <div className="main-body">
                <div className="title">{month}/{day}/{year}</div>
                <div className="grid">
                    {/* {console.log(daysToDos)} */}
                    {daysToDos.map((todo, index) => (
                        <div className="grid calendar-to-do-item" key={index}>
                            <div className="calender-to-do">{index + 1}. {todo}</div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }else{
        return(
            <div className="main-body">

            </div>
        )
    }
}

export default CalendarToDoC;