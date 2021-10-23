import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

const CalendarToDoC = (props) => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [daysToDos, setDaysToDos] = useState([]);

  //Display days to dos from calendar day
  useEffect(() => {
    const fetchData = async () => {
      try {
        setMonth(props.selectedDay.slice(5, 7));
        setDay(props.selectedDay.slice(8, 10));
        setYear(props.selectedDay.slice(0, 4));

        let toDosArray = [];
        for (let i = 0; i < props.days.length; i++) {
          if (props.selectedDay === props.days[i].date) {
            toDosArray.push(props.days[i].toDo);
          }
        }
        setDaysToDos(...toDosArray);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [props.selectedDay]);

  if (daysToDos) {
    return (
      <div>
        <div className="title">
          {month}/{day}/{year}
        </div>
        <div className="grid">
          {daysToDos.map((todo, index) => (
            <div className="grid calendar-to-do-item" key={index}>
              <div className="calender-to-do">
                {index + 1}. {todo}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

CalendarToDoC.propTypes = {
  selectedDay: PropTypes.string,
  days: PropTypes.array
}

export default CalendarToDoC;
