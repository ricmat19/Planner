import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Calculator from "./routes/calculator";
import Calendar from "./routes/calendar";
import Planner from "./routes/planner";

const App = () =>{
    return (
        // <CollectionContextProvider>
            <div>
                <Router>
                    <Route exact path="/calculator" component={Calculator}/>
                    <Route exact path="/calendar" component={Calendar}/>
                    <Route exact path="/planner" component={Planner}/>
                </Router>
            </div>
        // </CollectionContextProvider>
    )
}

export default App;