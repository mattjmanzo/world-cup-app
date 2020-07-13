import React, { Component } from "react";

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
>>>>>>> 37285cf50fcc6d8f3a1d217b092cca0f19a4bf6e
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    console.log(this.state);
    console.log(this.props);

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
