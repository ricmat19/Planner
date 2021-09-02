import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import { PlannerContextProvider } from './plannerContext';
import Home from "./routes/home";

const App = () =>{
    return (
        <PlannerContextProvider>
            <div>
                <Router>
                    <Route exact path="/planner" component={Home}/>
                </Router>
            </div>
        </PlannerContextProvider>
    )
}

export default App;