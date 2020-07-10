import React, { Component } from "react";

const teams = ["France", "Iran", "Germany"];
class GameSim extends Component {
  state = {
    teams: teams,
    selectedTeam: "",
  };
  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <div>
        <select name="selectedTeam" id="">
          {this.state.teams.map((team) => (
            <option value={team}>{team}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default GameSim;
