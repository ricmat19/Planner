import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
import Home from "./routes/home";

const App = () =>{

    return (
        <div>
            {/* <DndProvider backend={HTML5Backend}> */}
            <Router>
                <Route exact path="/planner" component={Home}/>
            </Router>
            {/* </DndProvider> */}
        </div>
    )
}

export default App;