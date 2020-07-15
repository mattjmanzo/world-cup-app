import React, { Component } from "react";
import axios from "axios";
import teams from "../teams.js";
import stadiums from "../stadiums.js";
import colors from "../colors.js";

const zodiacSigns = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

class GameSim extends Component {
  //State

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

  async componentDidMount() {
    console.log("mount");
    let horoscopes = {};
    let promises = [];
    zodiacSigns.map((sign, i) => {
      promises.push(
        new Promise((resolve, reject) => {
          return setTimeout(async () => {
            let today = await axios.get(
              `https://cors-anywhere.herokuapp.com/http://horoscope-api.herokuapp.com/horoscope/today/${sign}`
            );
            let week = await axios.get(
              `https://cors-anywhere.herokuapp.com/http://horoscope-api.herokuapp.com/horoscope/week/${sign}`
            );
            console.log("got horoscope for", sign);
            horoscopes[sign] = { today: today.data, week: week.data };
            resolve();
          }, i * 1000);
        })
      );
    });

    Promise.all(promises).then((res) => {
      this.setState(
        {
          horoscopes,
        },
        () => console.log("all horosscopes", this.state.horoscopes)
      );
    });
  }

  //Event handlers

  onChangeHandler = (e) => {
    // console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
    // console.log(this.state);
  };

  onStadiumChangeHandler = (e) => {
    // console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
    // console.log(this.state);
  };

  onTimeChangeHandler = (e) => {
    // console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
    // console.log(this.state);
  };

  onDateChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    // console.log(this.state);
  };

  //Astrological information per team

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

    //First API "aztro"//Getting color, compatibility, lucky_number, lucky_time, mood //
    //It's an array of 11 players // We access to each one by adding [indexNumber].data.<variable>
    const team1FirstAPI = team1.map(async (eachPlayer) => {
      return await axios.post(
        `https://aztro.sameerkumar.website/?sign=${eachPlayer.ZodiacSign}&day=today`
      );
    });

    // console.log(team1FirstAPI);
    let team1FirstAPIPromises = await Promise.all(team1FirstAPI);
    console.log(team1FirstAPIPromises);

    this.setState(
      {
        team1FirstAPI: team1FirstAPIPromises,
      },
      () => {
        this.scoreByColor();
      }
    );

    //Second API
    const team1SecondAPI = team1.map(async (eachPlayer, i) => {
      console.log(
        eachPlayer.Name,
        " is a ",
        eachPlayer.ZodiacSign,
        "and his horoscopr is ",
        this.state.horoscopes[eachPlayer.ZodiacSign]
      );
    });
    // console.log(team1SecondAPI);
    let team1SecondAPIPromises = await Promise.all(team1SecondAPI);
    // console.log(team1SecondAPIPromises);

    //Third API
    const team1ThirdAPI = team1.map(async (eachPlayer) => {
      console.log(
        eachPlayer.Name,
        " is a ",
        eachPlayer.ZodiacSign,
        "and his horoscopr is ",
        this.state.horoscopes[eachPlayer.ZodiacSign]
      );
      //return await axios.get(
      //`https://cors-anywhere.herokuapp.com/http://horoscope-api.herokuapp.com/horoscope/week/${eachPlayer.ZodiacSign}`
      //);
    });
    // console.log(team1ThirdAPI);
    let team1ThirdAPIPromises = await Promise.all(team1ThirdAPI);
    // console.log(team1ThirdAPIPromises);

    //Second Team

    let team2 = this.state.teams[this.state.selectedTeam2];

    //First API "aztro"//Getting color, compatibility, lucky_number, lucky_time, mood //
    //It's an array of 11 players // We access to each one by adding [indexNumber].data.<variable>
    const team2FirstAPI = team2.map(async (eachPlayer) => {
      return await axios.post(
        `https://aztro.sameerkumar.website/?sign=${eachPlayer.ZodiacSign}&day=today`
      );
    });

    // console.log(team2FirstAPI);

    let newArray2 = await Promise.all(team2FirstAPI);
    // console.log(newArray2);

    //Second API
    const team2SecondAPI = team1.map(async (eachPlayer) => {
      console.log(
        eachPlayer.Name,
        " is a ",
        eachPlayer.ZodiacSign,
        "and his horoscopr is ",
        this.state.horoscopes[eachPlayer.ZodiacSign]
      );
      //return await axios.get(
      //`https://cors-anywhere.herokuapp.com/http://horoscope-api.herokuapp.com//horoscope/today/${eachPlayer.ZodiacSign}`
      //);
    });
    // console.log(team2SecondAPI);
    let team2SecondAPIPromises = await Promise.all(team2SecondAPI);
    // console.log(team2SecondAPIPromises);

    //Third API
    const team2ThirdAPI = team2.map(async (eachPlayer) => {
      console.log(
        eachPlayer.Name,
        " is a ",
        eachPlayer.ZodiacSign,
        "and his horoscopr is ",
        this.state.horoscopes[eachPlayer.ZodiacSign]
      );
      //return await axios.get(
      //`https://cors-anywhere.herokuapp.com/http://horoscope-api.herokuapp.com/horoscope/week/${eachPlayer.ZodiacSign}`
      //);
    });
    // console.log(team2ThirdAPI);
    let team2ThirdAPIPromises = await Promise.all(team2ThirdAPI);
    // console.log(team2ThirdAPIPromises);
  }

  //Display Teams in render
  displayTeam1 = () => {
    let startingTeam1 = this.state.teams[this.state.selectedTeam1];
    // console.log(this.state.teams[this.state.selectedTeam1]);
    let team1 = startingTeam1.map((player, i) => {
      // console.log(startingTeam1[i].Name);
      return (
        <div key={player.Name}>
          <li>{startingTeam1[i].Name}</li>
          <li>{startingTeam1[i].Position}</li>
          <li>{startingTeam1[i].ZodiacSign}</li>
          <img src={startingTeam1[i].PlayerPicture} />
        </div>
      );
    });
    return team1;
  };

  displayTeam2 = () => {
    let startingTeam2 = this.state.teams[this.state.selectedTeam2];
    // console.log(this.state.teams[this.state.selectedTeam2]);
    let team2 = startingTeam2?.map((player, i) => {
      // console.log(startingTeam2[i].Name);
      return (
        <div key={player.Name}>
          <li>{startingTeam2[i].Name}</li>
          <li>{startingTeam2[i].Position}</li>
          <li>{startingTeam2[i].ZodiacSign}</li>
          <img src={startingTeam2[i].PlayerPicture} />
        </div>
      );
    });
    return team2;
  };

  //Weather Panel with Stadium name and brief description

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

  //Functions to score goals

  scoreByColor = () => {
    let colorTeam1FromApi = this.state.team1FirstAPI;
    // let colorTeam2FromApi = this.state.team2FirstAPI;

    //First API "aztro"//Getting color, compatibility, lucky_number, lucky_time, mood //
    //It's an array of 11 players // We access to each one by adding [indexNumber].data.<variable>
    let team1ColorsFromAPI = colorTeam1FromApi.map((element) => {
      console.log(element.data.color);
    });
    console.log(team1ColorsFromAPI);
  };

  //Confirm button that sends all info to APIs and display players and stats

  submitForm = (event) => {
    event.preventDefault();
    this.astrologicalStats();
    this.stadiumWeatherPanel();
    this.setState({
      display: true,
    });
    console.log(this.state);
    this.scoreByColor();
  };

  //Render

  render() {
    console.log(this.state);
    // console.log(this.props);

    return (
      <div>
        <form action="/action_page.php" onSubmit={this.submitForm}>
          <h4>
            Please choose your teams for single match, date and hour and let the
            astrological gods decide a winner
          </h4>

          <br />

          {/* <label for="team1">Team 1</label> */}
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

          {/* <label for="hour">Team 2</label> */}
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

          {/* <label for="stadium">Stadium</label> */}
          <select
            name="selectedStadium"
            id=""
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

          <br />

          {/* <label for="date">Date</label> */}
          <input
            onChange={this.onDateChangeHandler}
            type="text"
            id="fordate"
            name="date"
            placeholder="Insert date: mm/dd/yyyy"
            value={this.state.date}
          />

          <br />

          {/* <label for="hour">Hour</label> */}
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

          <input type="submit" value="Confirm" />
        </form>
        {this.state.display ? this.displayTeam1() : ""}
        {this.state.display ? this.displayTeam2() : ""}
        {this.state.display ? this.stadiumWeatherPanel() : ""}
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
