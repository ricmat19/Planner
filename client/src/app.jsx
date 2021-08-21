import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Calculator from "./routes/calculator";
import Calendar from "./routes/calendar";
import ToDo from "./routes/toDo";

const App = () =>{
    return (
        // <CollectionContextProvider>
            <div>
                <Router>
                    <Route exact path="/calculator" component={Calculator}/>
                    <Route exact path="/calendar" component={Calendar}/>
                    <Route exact path="/todos" component={ToDo}/>
                </Router>
            </div>
        // </CollectionContextProvider>
    )
}

export default App;