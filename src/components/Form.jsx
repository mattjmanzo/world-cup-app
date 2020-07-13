import React, { Component } from "react";
import teams from "../teams.js";

class Form extends Component {
  state = {
    teams: teams,
    selectedTeam: "",
    // showForm: true,
  };

  onChangeHandler = (e) => {
    // console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitForm = (event) => {
    event.preventDefault();

    this.props.history.push("/match");
  };

  render() {
    return (
      <div>
        <form
          action="/action_page.php"
          onSubmit={this.submitForm} //, this.toggleButton)}
        >
          <h4>
            Please choose your teams for single match, date and hour and let the
            astrological gods decide a winner
          </h4>
          <br />
          <label for="team1">Team 1</label>
          <select
            name="selectedTeam"
            id="team1"
            onChange={this.onChangeHandler}
          >
            <option value="" disabled selected>
              Choose team
            </option>
            {this.state.teams.name}
            {Object.keys(this.state.teams)
              .filter((team) => team !== this.state.selectedTeam2)
              .map((team) => (
                <option value={team} key={team}>
                  {team}
                </option>
              ))}

            {/* {this.state.selectedTeam2 &&
              this.state.teams[this.state.selectedTeam2].StartingXI.map(
                (player) => (
                  <div>
                    <li key={player.Name}>{player.Name}</li>
                  </div>
                )
              )} */}
            {console.log(this.state)}
          </select>
          <br />
          <label for="hour">Team 2</label>
          <select name="selectedTeam2" id="" onChange={this.onChangeHandler}>
            <option value="" disabled selected>
              Choose team
            </option>
            {Object.keys(this.state.teams)
              .filter((team) => team !== this.state.selectedTeam)
              .map((team) => (
                <option value={team} key={team}>
                  {team}
                </option>
              ))}
            {/* {this.state.selectedTeam &&
              this.state.teams[
                this.state.selectedTeam
              ].StartingXI.map((player) => (
                <li key={player.Name}>{player.Name}</li>
              ))} */}
            {console.log(this.state)}
          </select>
          <br />
          <label for="date">Date</label>
          <input
            type="text"
            id="fordate"
            name="date"
            placeholder="mm/dd/yyyy"
          />
          <br />
          <label for="hour">Hour</label>
          <select name="hour" id="">
            <option value="" disabled selected>
              Select hour
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <select name="time" id="fortime">
            <option value="am">am</option>
            <option value="pm">pm</option>
          </select>
          <br />
          <input type="submit" value="Confirm" />
        </form>
      </div>
    );
  }
}

export default Form;
