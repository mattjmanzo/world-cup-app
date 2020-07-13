import React, { Component } from "react";
import axios from "axios";
import './App.css';
import Header from './components/Header';
import Sentiment from "sentiment";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import GameSim from "./components/GameSim";
// import { Argentina } from "./teams";

// console.log(Argentina);

var sentiment = new Sentiment();
var result = sentiment.analyze("Dogs are awesome.");
console.dir(result);

class App extends Component {
  state = {
    team: [],
  };



  showTeamData = () => {
    return this.state.team.map((eachPlayer) => {
      return (
        <li>
          <h4>{eachPlayer.Name}</h4>
          <img src={eachPlayer.PlayerPicture}></img>
          <h4>{eachPlayer.description}</h4>
          <h4>{eachPlayer.mood}</h4>
          <h4>{eachPlayer.ZodiacSign}</h4>
        </li>
      );
    });
  };


  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" render={() => <LandingPage />} />
          <Route exact path="/game-sim" render={() => <GameSim />} />
        </Switch>
        {/* {this.showTeamData()} */}
      </div>
    );
  }
}

export default App;
