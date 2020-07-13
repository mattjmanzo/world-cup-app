import React, { Component } from "react";
import {Argentina, Brazil, Spain } from "../teams";

class GameSim extends Component {
  state = {
    teams: [],
    selectedTeam: "",
  };


  async componentDidMount() {
    // let res = await axios.get(
    //   "https://cors-anywhere.herokuapp.com/https://horoscope-api.herokuapp.com/horoscope/year/libra"
    // );

    // const promises = Argentina.StartingXI.map(async (player) => {
    //   let r = await axios.post(
    //     `https://aztro.sameerkumar.website/?sign=${player.ZodiacSign}&day=today`
    //   );
    //   console.log(r);
    //   let randomMood = {
    //     rmood: randomMoods[Math.floor(Math.random() * randomMoods.length)],
    //   };
    //   return { ...r.data, ...player, ...randomMood };
    // });
    // Promise.all(promises).then((infoData) => {
    //   console.log(infoData);
    //   this.setState({
    //     team: infoData,
    //   });
    // });
    // console.log(promises);
    // console.log(res);
    // console.log(res.data.horoscope);
    // let horoscope = sentiment.analyze(res.data.horoscope);
    // console.log(horoscope);
    // console.log(soccer);
  }

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
