import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import soccer from "./csvjson";
import Header from "./components/Header";
import Sentiment from "sentiment";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import GameSim from "./components/GameSim";
// import Form from "./components/Form";

// const randomMoods = ["happy", "sad", "jolly"];

// var sentiment = new Sentiment();
// var result = sentiment.analyze("Dogs are awesome.");
// console.dir(result);

class App extends Component {
  state = {
    team: [],
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

  // showTeamData = () => {
  //   return this.state.team.map((eachPlayer) => {
  //     return (
  //       <li>
  //         <h4>{eachPlayer.Name}</h4>
  //         <img src={eachPlayer.PlayerPicture}></img>
  //         <h4>{eachPlayer.description}</h4>
  //         <h4>{eachPlayer.mood}</h4>
  //         <h4>{eachPlayer.ZodiacSign}</h4>
  //       </li>
  //     );
  //   });
  // };

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/game-sim" component={GameSim} />
          <Route exact path="/" component={LandingPage} />
          {/* <Route exact path="/form" component={Form} /> */}
        </Switch>
        <Header />
        {/* {this.showTeamData()} */}
      </div>
    );
  }
}

export default App;
