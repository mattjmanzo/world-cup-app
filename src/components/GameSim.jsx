import React, { Component } from "react";
import axios from "axios";
import teams from "../teams.js";
import image from '../img/world-cupbackground.jpg';
import Header from './Header';
import { Button } from '@material-ui/core';
import stadiums from "../stadiums.js";

class GameSim extends Component {
  state = {
    teams: teams,
    stadiums: stadiums,
    display: false,
    selectedStadium: "",
    date: "",
    hour: "",
    weatherPanelDisplay: false,
    weather: "",
    team1FirstAPI: [],
    team2FirstAPI: [],
    score: [0, 0],
  };
  onChangeHandler = (e) => {
    // console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state);
  };

  onStadiumChangeHandler = (e) => {
    // console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state);
  };

  onTimeChangeHandler = (e) => {
    // console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state);
  };

  onDateChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    // console.log(this.state);
  };

  async astrologicalStats() {
    //Weather API
    let weather = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=ded140817fa64dcb9dd161358201407&q=${this.state.selectedStadium}`
    );
    this.setState({
      weather: weather,
    });
    // console.log(weather);

    //Running 3 API per team

    //First Team
    let team1 = this.state.teams[this.state.selectedTeam1];

    const team1FirstAPI = team1.map(async (eachPlayer) => {
      return await axios.post(
        `https://aztro.sameerkumar.website/?sign=${eachPlayer.ZodiacSign}&day=today`
      );
    });
    
    
    let team1FirstAPIPromises = await Promise.all(team1FirstAPI);
    // console.log(team1FirstAPIPromises);

    this.setState({
      team1FirstAPI: team1FirstAPIPromises,
    });
    console.log(this.state.team1FirstAPI[0].data);

    const team1SecondAPI = team1.map(async (eachPlayer) => {
      return await axios.get(
        `https://cors-anywhere.herokuapp.com/http://horoscope-api.herokuapp.com//horoscope/today/${eachPlayer.ZodiacSign}`
      );
    });
    
    let team1SecondAPIPromises = await Promise.all(team1SecondAPI);
    // console.log(team1SecondAPIPromises);
    this.setState({
      team2FirstAPI: team1SecondAPIPromises,
    });

    console.log(this.state.team2FirstAPI.data);
    
    const team1ThirdAPI = team1.map(async (eachPlayer) => {
      return await axios.get(
        `https://cors-anywhere.herokuapp.com/http://horoscope-api.herokuapp.com/horoscope/week/${eachPlayer.ZodiacSign}`
      );
    });
    // console.log(team1ThirdAPI);
    let team1ThirdAPIPromises = await Promise.all(team1ThirdAPI);
    console.log(team1ThirdAPIPromises);

    //Second Team
    let team2 = this.state.teams[this.state.selectedTeam2];
    const team2FirstAPI = team2.map(async (eachPlayer) => {
      return await axios.post(
        `https://aztro.sameerkumar.website/?sign=${eachPlayer.ZodiacSign}&day=today`
      );
    });

    let newArray2 = await Promise.all(team2FirstAPI);
    // console.log(newArray2);

    const team2SecondAPI = team1.map(async (eachPlayer) => {
      return await axios.get(
        `https://cors-anywhere.herokuapp.com/http://horoscope-api.herokuapp.com//horoscope/today/${eachPlayer.ZodiacSign}`
      );
    });
    let team2SecondAPIPromises = await Promise.all(team2SecondAPI);
    // console.log(team2SecondAPIPromises);
  }
  displayTeam1 = () => {
    let startingTeam1 = this.state.teams[this.state.selectedTeam1];
    let team1 = startingTeam1.map((player, i) => {
      // console.log(startingTeam1[i].Name);
      return (
        <div className="card">
          <div className="card-inner">
            <div className="card-front">
              <img className="row___picture" src={startingTeam1[i].PlayerPicture} alt={startingTeam1[i].Name}></img>
            </div>
            <div className="card-back" key={player.Name}>
              <ul>
                <li><strong>Name:</strong>{startingTeam1[i].Name}</li>
                <li><strong>Position:</strong>{startingTeam1[i].Position}</li>
                <li><strong>Zodiac Sign:</strong>{startingTeam1[i].ZodiacSign}</li>    
              </ul>            
            </div> 
          </div>
        </div>
      );
    });
    return team1;
  };
  displayTeam2 = () => {
    let startingTeam2 = this.state.teams[this.state.selectedTeam2];
    let team2 = startingTeam2?.map((player, i) => {
      // console.log(startingTeam2[i].Name);
      return (
        <div className="card">
          <div className="card-inner">
            <div className="card-front">
              <img className="row___picture" src={startingTeam2[i].PlayerPicture} alt={startingTeam2[i].Name}></img>
            </div>
            <div className="card-back" key={player.Name}>
              <ul>
                <li><strong>Name:</strong>{startingTeam2[i].Name}</li>
                <li><strong>Position:</strong>{startingTeam2[i].Position}</li>
                <li><strong>Zodiac Sign:</strong>{startingTeam2[i].ZodiacSign}</li>    
              </ul>            
            </div> 
          </div>
        </div>
      );
    });
    return team2;
  };

  scoreByColor = () => {
    let colorTeam1FromApi = this.state.team1FirstAPI;
    let colorTeam2FromApi = this.state.team2FirstAPI;

    colorTeam1FromApi.map( item => {
      console.log(item.data.color);
    })
  };

  
  

  stadiumWeatherPanel = () => {
    // console.log(this.state.stadiums);
    return (
      <div className="">
        <h2>Stadium:{this.state.selectedStadium}</h2>
        <h4>Temperature:{this.state.weather?.data?.current.temp_f}</h4>
        <p>
          Description:
          {
            this.state.stadiums.find(
              (s) => s.name === this.state.selectedStadium
            )?.description
          }
        </p>
      </div>
    );
  };

  submitForm = (event) => {
    event.preventDefault();
    this.astrologicalStats();
    this.stadiumWeatherPanel();
    this.setState({
      display: true,
    });
  };
  render() {
    return (
      <div>
      <header className="banner"
                style={{
                    backgroundSize:'cover',
                    backgroundImage: `url(${image})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
      <Header></Header>
      <div className='banner__content'>
        <form action="/action_page.php" onSubmit={this.submitForm}>
          <fieldset>
          <legend><span class="number">1</span>Please choose your teams for the match</legend>
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

          {/* <label for="hour">Team 2</label> */}
          <label for="team2">Team 2</label>
          <select name="selectedTeam2" id="team2" onChange={this.onChangeHandler}>
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
          </fieldset>

          {/* <label for="stadium">Stadium</label> */}
          <fieldset>
          <label for="stadium">Pick Stadium</label>
          <select
            name="selectedStadium"
            id="stadium"
            onChange={this.onStadiumChangeHandler}
          >
            <option value="" disabled selected>
              Select Stadium
            </option>
            <option value="Moscow">Moscow</option>
            <option value="St Peterburg">St Peterburg</option>
            <option value="Kazan">Kazan</option>
            <option value="Sochi">Sochi</option>
            <option value="Nizhny Novgorod">Nizhny Novgorod</option>
            <option value="Kaliningrad">Kaliningrad</option>
            <option value="Volgograd">Volgograd</option>
            <option value="Rostov-on-don">Rostov-on-don</option>
            <option value="Ekaterinburg">Ekaterinburg</option>
            <option value="Samara">Samara</option>
            <option value="Saranks">Saranks</option>
          </select>


          {/* <label for="hour">Hour</label> */}
          <label for="stadium">Game Time?</label>
          <select name="hour" id="" onChange={this.onTimeChangeHandler}>
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
          </fieldset>
          <input type="submit" value="Confirm" />
        </form>
      </div>
      <div className="banner--fadeBottom"/>
      </header>
      <div className="row">
          <h2>Team 1</h2>
          <div className="cards">
            {this.state.display ? this.displayTeam1() : ""}
          </div>
        </div>
        <div className="row">
         <h2>Team 2</h2>
         <div className="cards">
          {this.state.display ? this.displayTeam2() : ""}
         </div>
        </div>
        <div>
         {this.state.display ? this.stadiumWeatherPanel() : ""}
        </div>
      </div>
    );
  }
}
export default GameSim;
// let team1 = this.state.teams[this.state.selectedTeam1];
// let signs = this.state.teams[this.state.selectedTeam1]
//   .concat(this.state.teams[this.state.selectedTeam2])
//   .reduce(
//     (a, v) => (a.includes(v.ZodiacSign) ? a : [...a, v.ZodiacSign]),
//     []
//   );
// // console.log(signs);
// const promises = signs.map(async (sign) => {
//   return await axios.post(
//     `https://aztro.sameerkumar.website/?sign=${sign}&day=today`
//   );
// });
// // console.log(promises);
// let newArray = await Promise.all(promises);
// let changedPlayers = this.state.teams[this.state.selectedTeam1]
//   .concat(this.state.teams[this.state.selectedTeam2])
//   .map((player) => {
//     return {
//       ...player,
//       ZodiacSign: newArray.find(
//         (v) => v.data.compatibility.toLowerCase() === player.ZodiacSign
//       ),
//     };
//   });
// console.log(newArray, changedPlayers);