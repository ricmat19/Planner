import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./routes/home";

const App = () => {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Home} />
      </Router>
    </div>
  );
};

export default App;
