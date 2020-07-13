import React, { Component } from "react";
import {Argentina, Brazil, Spain } from "../teams.json";

class GameSim extends Component {
  state = {
    teams: teams,
    selectedTeam: "",
  };
  onChangeHandler = (e) => {
    console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <div>
        <div>
          <select name="selectedTeam" id="" onChange={this.onChangeHandler}>
            {Object.keys(this.state.teams)
              .filter((team) => team !== this.state.selectedTeam2)
              .map((team) => (
                <option value={team} key={team}>
                  {team}
                </option>
              ))}
          </select>
          {this.state.selectedTeam &&
            this.state.teams[this.state.selectedTeam].StartingXI.map((play) => (
              <li key={play.Name}>{play.Name}</li>
            ))}
        </div>
        <div>
          <select name="selectedTeam2" id="" onChange={this.onChangeHandler}>
            {Object.keys(this.state.teams)
              .filter((team) => team !== this.state.selectedTeam)
              .map((team) => (
                <option value={team} key={team}>
                  {team}
                </option>
              ))}
          </select>
          {this.state.selectedTeam2 &&
            this.state.teams[this.state.selectedTeam2].Formation}
        </div>
      </div>
    );
  }
}

export default GameSim;
