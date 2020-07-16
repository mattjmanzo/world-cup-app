import React, { Component } from "react";
import axios from "axios";
import teams from "../teams.js";
import stadiums from "../stadiums.js";
import colors from "../colors.js";
import horoscopeData from "../horoscopeData.json";
import Sentiment from "sentiment";

const sentiment = new Sentiment();

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
    horoscopes: horoscopeData,
    team1FirstAPI: [],
    team2FirstAPI: [],
    team1WordCloud: {},
    team2WordCloud: {},
    score: [0, 0],
  };

  //Merging info from 3 APIs into an array of 12 zodiac signs and setting up the state value of horoscopes to horoscopeData

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
            let specialAPI = await axios.post(
              `https://aztro.sameerkumar.website/?sign=${sign}&day=today`
            );
            console.log("got horoscope for", sign);
            horoscopes[sign] = {
              today: today.data,
              week: week.data,
              specialAPI: specialAPI.data,
            };
            resolve();
          }, i * 1000);
        })
      );
    });

    Promise.all(promises).then((res) => {
      console.log(String(horoscopes));
      console.log(JSON.stringify(horoscopes));
      this.setState(
        {
          horoscopes,
        },
        // () => console.log("all horoscopes", this.state.horoscopes)
        () => this.scoreGoal()
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

  //Weather information for stadium

  async getWeather() {
    //Weather API
    let weather = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=ded140817fa64dcb9dd161358201407&q=${this.state.selectedStadium}`
    );
    this.setState({
      weather,
    });
  }

  //Display Teams in render
  displayTeam1 = () => {
    let startingTeam1 = this.state.teams[this.state.selectedTeam1];
    // console.log(this.state.teams[this.state.selectedTeam1]);
    let wordCloud = {};
    //team1WordCloud
    let score = 0;
    let team1 = startingTeam1.map((player, i) => {
      // console.log(startingTeam1[i].Name);
      let result = sentiment.analyze(
        this.state.horoscopes[player.ZodiacSign].today.horoscope
      );
      let result2 = sentiment.analyze(
        this.state.horoscopes[player.ZodiacSign].week.horoscope
      );
      console.log(result, result2);
      let playerscore = result.score + result2.score;
      let playerWords = [...result.words, ...result2.words];
      playerWords.map((word) => {
        wordCloud[word] ? wordCloud[word]++ : (wordCloud[word] = 1);
      });
      score += playerscore;
      let hPlayer = this.state.horoscopes[player.ZodiacSign];
      return (
        <div style={{ backgroundColor: player.JerseyColor }} key={player.Name}>
          <li style={{ color: hPlayer.specialAPI.color }}>
            {startingTeam1[i].Name}
          </li>
          <li>{startingTeam1[i].Position}</li>
          <li>{startingTeam1[i].ZodiacSign}</li>
          <li>{playerscore}</li>
          {/* <li>
            {player.JerseyColor} {hPlayer.specialAPI.color}
          </li> */}
          <p>{hPlayer.today.horoscope}</p>
          <p>{hPlayer.week.horoscope}</p>
          <img src={startingTeam1[i].PlayerPicture} />
        </div>
      );
    });
    console.log("team1 has score", score, team1);

    let cloud = [];

    for (let w in wordCloud) {
      cloud.push(
        React.createElement(
          "li",
          {
            className: "word",
            style: {
              color: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
              fontSize: wordCloud[w] * 10 + "px",
              position: "absolute",
              top: Math.random() * 500 + "px",
              left: Math.random() * 500 + "px",
              //transform: "rotate(" + 90 * Math.random() + "deg)",
            },
          },
          w
        )
      );
    }

    let theCloud = React.createElement("ul", { className: "cloud" }, cloud);

    team1.unshift(theCloud);

    return team1;
  };

  displayTeam2 = () => {
    let startingTeam2 = this.state.teams[this.state.selectedTeam2];
    // console.log(this.state.teams[this.state.selectedTeam2]);
    let wordCloud = {};
    //team1WordCloud
    let score = 0;
    let team2 = startingTeam2.map((player, i) => {
      // console.log(startingTeam1[i].Name);
      let result = sentiment.analyze(
        this.state.horoscopes[player.ZodiacSign].today.horoscope
      );
      let result2 = sentiment.analyze(
        this.state.horoscopes[player.ZodiacSign].week.horoscope
      );
      console.log(result, result2);
      let playerscore = result.score + result2.score;
      let playerWords = [...result.words, ...result2.words];
      playerWords.map((word) => {
        wordCloud[word] ? wordCloud[word]++ : (wordCloud[word] = 1);
      });
      score += playerscore;
      let hPlayer = this.state.horoscopes[player.ZodiacSign];
      return (
        <div style={{ backgroundColor: player.JerseyColor }} key={player.Name}>
          <li style={{ color: hPlayer.specialAPI.color }}>
            {startingTeam2[i].Name}
          </li>
          <li>{startingTeam2[i].Position}</li>
          <li>{startingTeam2[i].ZodiacSign}</li>
          <li>{playerscore}</li>
          {/* <li>
            {player.JerseyColor} {hPlayer.specialAPI.color}
          </li> */}
          <p>{hPlayer.today.horoscope}</p>
          <p>{hPlayer.week.horoscope}</p>
          <img src={startingTeam2[i].PlayerPicture} />
        </div>
      );
    });
    console.log("team1 has score", score, team2);

    let cloud = [];

    for (let w in wordCloud) {
      cloud.push(
        React.createElement(
          "li",
          {
            className: "word",
            style: {
              color: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
              fontSize: wordCloud[w] * 10 + "px",
              position: "absolute",
              top: Math.random() * 500 + "px",
              left: Math.random() * 500 + "px",
              //transform: "rotate(" + 90 * Math.random() + "deg)",
            },
          },
          w
        )
      );
    }

    let theCloud = React.createElement("ul", { className: "cloud" }, cloud);

    team2.unshift(theCloud);

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

  scoreGoal = () => {
    //Using color, compatibility, lucky_number, lucky_time, mood from specialAPI(in horoscopeData.json)//

    let team1Score = 0;

    //Scoring by colors

    // let startingTeam1 = this.state.teams[this.state.selectedTeam1];

    // let goalByColorTeam1 = startingTeam1.map((player) => {
    //   if (
    //     player.JerseyColor ===
    //     this.state.horoscopes[player.ZodiacSign].specialAPI.color
    //   ) {
    //     return (team1Score += 2);
    //   }
    //   else if (
    //             colors[player.JerseyColor.toUpperCase()].r +
    //             colors[player.JerseyColor.toUpperCase()].g +
    //             colors[player.JerseyColor.toUpperCase()].b >
    //             colors[this.state.horoscopes[player.ZodiacSign].specialAPI.color].r +
    //             colors[this.state.horoscopes[player.ZodiacSign].specialAPI.color].g +
    //             colors[this.state.horoscopes[player.ZodiacSign].specialAPI.color].b
    //             ) {
    //     return (team1Score += 1);
    //   };

    //   console.log(team1Score);

    //Scoring by moods

    // let moods = [
    //   "Creative",
    //   "Energetic",
    //   "Cautious",
    //   "Collaborative",
    //   "Mellow",
    //   "Hopeful",
    //   "Focus",
    //   "Relaxed",
    //   "Sweet",
    //   "Serious",
    //   "Responsible",
    // ];

    // let charactersPerName = (playerName) => {
    //   let count = 0;
    //   for (let i = 0; i < playerName.length; i++) {
    //     if (playerName.charAt(i) != " ") {
    //       count++;
    //     }
    //     return count;
    //   }
    // };

    // let loopArrayNTimes = (n, array) => {
    //   for (let i = 0; i < n; i++) {
    //     return array[n % array.length];
    //   }
    // };

    // let goalByMood = startingTeam1.map((player) => {
    //   let numberCharacters = charactersPerName(player.name);
    //   let playerMood = loopArrayNTimes(numberCharacters, moods);
    //   if (
    //     playerMood === this.state.horoscopes[player.ZodiacSign].specialAPI.mood
    //   ) {
    //     return (team1Score += 1);
    //   } else {
    //     console.log("no goal");
    //   }
    // });

    //Scoring by Lucky Number

    // let goalByLuckyNumber = startingTeam1.map((player) => {
    //   if(player.JerseyNumber===this.state.horoscopes[player.ZodiacSign].specialAPI.lucky_number){
    //     return team1Score+=2
    //   } else if (player.JerseyNumber>this.state.horoscopes[player.ZodiacSign].specialAPI.lucky_number){
    //     return team1Score+=1
    //   };
    // });

    ////Scoring by Compatibility

    // let goalByCompatibility = startingTeam1.map((player) => {}

    //Scoring by Lucky Time
    // let goalByLuckyTime = startingTeam1.map((player) => {
    //   (if this.state.hour===this.state.horoscopes[player.ZodiacSign].specialAPI.lucky_time){
    //     return team1Score+=1
    //   }
    // })

    let team2Score = 0;
    // let startingTeam2 = this.state.teams[this.state.selectedTeam2];
    // let goalByColorTeam2 = startingTeam2.map((player) => {
    //   if (
    //     player.JerseyColor ===
    //     this.state.horoscopes[player.ZodiacSign].specialAPI.color
    //   ) {
    //     return (team2Score += 2);
    //   }
    // });
    console.log(team2Score);
  };

  //Confirm button that sends all info to APIs and display players and stats

  submitForm = (event) => {
    event.preventDefault();
    this.getWeather();
    this.stadiumWeatherPanel();
    this.setState({
      display: true,
    });
    console.log(this.state);
    this.scoreGoal();
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
