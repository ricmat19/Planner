import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import { PlannerContextProvider } from './plannerContext';
import Calculator from "./routes/calculator";
import Calendar from "./routes/calendar";
import Planner from "./routes/planner";

const App = () =>{
    return (
        <PlannerContextProvider>
            <div>
                <Router>
                    <Route exact path="/calculator" component={Calculator}/>
                    <Route exact path="/calendar" component={Calendar}/>
                    <Route exact path="/planner" component={Planner}/>
                </Router>
            </div>
        </PlannerContextProvider>
    )
}

export default App;