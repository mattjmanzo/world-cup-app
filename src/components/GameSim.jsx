import React, { Component } from "react";

class GameSim extends Component {
  state = {
    teams: [],
    display: false,
  };

  onChangeHandler = (e) => {
    console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state);
  };

  async astrologicalStats() {
    // let res = await axios.get(
    //     "https://cors-anywhere.herokuapp.com/https://horoscope-api.herokuapp.com/horoscope/year/libra"
    //   );
    console.log(this.state);
    let team1 = this.state.teams[this.state.selectedTeam1];
    const promises = team1.map(async (eachPlayer) => {
      return await axios.post(
        `https://aztro.sameerkumar.website/?sign=${eachPlayer.ZodiacSign}&day=today`
      );
    });
    console.log(promises);

    let newArray = await Promise.all(promises);
    console.log(newArray);
    // Promise.all(promises)
    // .then((response) => console.log(response))
    // .catch((error) => console.log(error));
    // const promises = this.state.teams[this.state.selectedTeam1].map(
    // async (player) => {
    //   let r = await axios.post(
    //     `https://aztro.sameerkumar.website/?sign=${player.ZodiacSign}&day=today`
    //   );
    //   console.log(r);

    // let randomMood = {
    //   rmood: randomMoods[Math.floor(Math.random() * randomMoods.length)],
    // };
    // return { ...r.data, ...player, ...randomMood };
    //   }
    // );

    //   Promise.all(promises).then((infoData) => {
    //     console.log(infoData);
    //     this.setState({
    //       team: infoData,
    //     });
    //   });
  }

  displayTeam1 = () => {
    let startingTeam1 = this.state.teams[this.state.selectedTeam1];
    console.log(this.state.teams[this.state.selectedTeam1]);
    let team1 = startingTeam1.map((player, i) => {
      console.log(startingTeam1[i].Name);
      return (
        <div>
          <li key={player.Name}>{startingTeam1[i].Name}</li>
          <li key={player.Name}>{startingTeam1[i].Position}</li>
          <li key={player.Name}>{startingTeam1[i].ZodiacSign}</li>
          <img src={startingTeam1[i].PlayerPicture} />
        </div>
      );
    });
    return team1;
  };

  displayTeam2 = () => {
    let startingTeam2 = this.state.teams[this.state.selectedTeam2];
    console.log(this.state.teams[this.state.selectedTeam2]);
    let team2 = startingTeam2.map((player, i) => {
      console.log(startingTeam2[i].Name);
      return (
        <div>
          <li key={player.Name}>{startingTeam2[i].Name}</li>
          <li key={player.Name}>{startingTeam2[i].Position}</li>
          <li key={player.Name}>{startingTeam2[i].ZodiacSign}</li>
          <img src={startingTeam2[i].PlayerPicture} />
        </div>
      );
    });
    return team2;
  };

  submitForm = (event) => {
    event.preventDefault();
    this.astrologicalStats();
    this.setState({
      display: true,
    });
  };

  render() {
    console.log(this.state);
    console.log(this.props);

    return (
      <div>
        <form action="/action_page.php" onSubmit={this.submitForm}>
          <h4>
            Please choose your teams for single match, date and hour and let the
            astrological gods decide a winner
          </h4>
          <br />
          <label for="team1">Team 1</label>
          <select
            name="selectedTeam1"
            id="team1"
            onChange={this.onChangeHandler}
          >
            <option value="" disabled selected>
              Choose team
            </option>
            {Object.keys(this.state.teams)
              .filter((team) => team !== this.state.selectedTeam2)
              .map((team) => (
                <option value={team} key={team}>
                  {team}
                </option>
              ))}
          </select>
          <br />
          <label for="hour">Team 2</label>
          <select name="selectedTeam2" id="" onChange={this.onChangeHandler}>
            <option value="" disabled selected>
              Choose team
            </option>
            {Object.keys(this.state.teams)
              .filter((team) => team !== this.state.selectedTeam1)
              .map((team) => (
                <option value={team} key={team}>
                  {team}
                </option>
              ))}
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
            <option value="1am">1am</option>
            <option value="2am">2am</option>
            <option value="3am">3am</option>
            <option value="4am">4am</option>
            <option value="5am">5am</option>
            <option value="6am">6am</option>
            <option value="7am">7am</option>
            <option value="8am">8am</option>
            <option value="9am">9am</option>
            <option value="10am">10am</option>
            <option value="11am">11am</option>
            <option value="12pm">12pm</option>
            <option value="1pm">1pm</option>
            <option value="2pm">2pm</option>
            <option value="3pm">3pm</option>
            <option value="4pm">4pm</option>
            <option value="5pm">5pm</option>
            <option value="6pm">6pm</option>
            <option value="7pm">7pm</option>
            <option value="8pm">8pm</option>
            <option value="9pm">9pm</option>
            <option value="10pm">10pm</option>
            <option value="11pm">11pm</option>
            <option value="12am">12am</option>
          </select>
          <br />
          <input type="submit" value="Confirm" />
        </form>
        <h4>Team 1</h4>
        {this.state.display ? this.displayTeam1() : ""}
        <h4>Team 2</h4>
        {this.state.display ? this.displayTeam2() : ""}
      </div>
    );
  }
}

export default GameSim;
