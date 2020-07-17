import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import GameSim from "./components/GameSim";

class App extends Component {

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={GameSim} />
        </Switch>
        {/* {this.showTeamData()} */}
      </div>
    );
  }
}

export default App;
