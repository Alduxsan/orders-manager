import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AttendantView from "./components/AttendantView";
import ChefView from "./components/ChefView";
import Login from "./components/Login";

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route path="/attendant" component={AttendantView}></Route>
          <Route path="/chef" component={ChefView}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
