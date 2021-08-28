import React, {useState, createContext} from "react";

export const PlannerContext = createContext();

export const PlannerContextProvider = props => {

    const [toDos, setToDos] = useState([]);

    const createToDo = (toDo) => {
        setToDos([...toDos, toDo])
    }

    return(
        <PlannerContext.Provider value={{
            toDos: toDos, 
            setToDos: setToDos, createToDo,
        }}>
            {props.children}
        </PlannerContext.Provider>
    )
}