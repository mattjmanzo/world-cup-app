import React, { Component } from "react";
import axios from "axios";
import teams from "../teams.js";
import image from "../img/world-cupbackground.jpg";
import Header from "./Header";
import stadiums from "../stadiums.js";
import colors from "../colors.js";
import horoscopeData from "../horoscopeData.json";
import Sentiment from "sentiment"; // check if a word/phrase is positive or negative

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
    selectedTeam1: "",
    selectedTeam2: "",
    team1Score: 0,
    team2Score: 0,
  };

  //Merging info from 3 APIs into an array of 12 zodiac signs and setting up the state value of horoscopes to horoscopeData

  async componentDidMount() {
    console.log("mount");
    let horoscopes = {};
    let promises = [];
    zodiacSigns.forEach((sign, i) => {
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
            // console.log("got horoscope for", sign);
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
      // console.log(String(horoscopes));
      // console.log(JSON.stringify(horoscopes));
      this.setState(
        {
          horoscopes,
        }
        // () => console.log("all horoscopes", this.state.horoscopes)
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

  //Display Teams in render
  displayTeam = (teamName) => {
    let startingTeam1 = this.state.teams[teamName];
    // console.log(this.state.teams[teamName]);
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
      // console.log(result, result2);
      let playerscore = result.score + result2.score;
      let playerWords = [...result.words, ...result2.words];
      playerWords.forEach((word) => {
        wordCloud[word] ? wordCloud[word]++ : (wordCloud[word] = 1);
      });
      score += playerscore;
      // let hPlayer = this.state.horoscopes[player.ZodiacSign];
      return (
        <div className="card" key={player.Name}>
          <div className="card-inner">
            <div className="card-front">
              <img
                className="row___picture"
                src={startingTeam1[i].PlayerPicture}
                alt={startingTeam1[i].Name}
              ></img>
            </div>
            <div className="card-back" key={player.Name}>
              <ul>
                <li>
                  <strong>Name:</strong>
                  {startingTeam1[i].Name}
                </li>
                <li>
                  <strong>Position:</strong>
                  {startingTeam1[i].Position}
                </li>
                <li>
                  <strong>Zodiac Sign:</strong>
                  {startingTeam1[i].ZodiacSign}
                </li>
              </ul>
            </div>
          </div>
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

    //let theCloud = React.createElement("ul", { className: "cloud" }, cloud);

    team1.unshift(<ul className="cloud">{cloud}</ul>);

    return team1;
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

  //TEAM 1
  colorScore = () => {
    let startingTeam1 = this.state.teams[this.state.selectedTeam1];
    console.log(colors, startingTeam1);
    let goals = startingTeam1.reduce((currentGoals, player) => {
      console.log(
        colors[
          this.state.horoscopes[player.ZodiacSign].specialAPI.color
            .toUpperCase()
            .split(" ")
            .join("")
        ],
        this.state.horoscopes[player.ZodiacSign].specialAPI.color
          .toUpperCase()
          .split(" ")
          .join("")
      );
      if (
        player.JerseyColor ===
        this.state.horoscopes[player.ZodiacSign].specialAPI.color
          .split(" ")
          .join("")
      ) {
        return (currentGoals += 2);
      } else if (
        colors[player.JerseyColor.toUpperCase()].rgb.r +
          colors[player.JerseyColor.toUpperCase()].rgb.g +
          colors[player.JerseyColor.toUpperCase()].rgb.b >
        colors[
          this.state.horoscopes[player.ZodiacSign].specialAPI.color
            .toUpperCase()
            .split(" ")
            .join("")
        ].rgb.r +
          colors[
            this.state.horoscopes[player.ZodiacSign].specialAPI.color
              .toUpperCase()
              .split(" ")
              .join("")
          ].rgb.g +
          colors[
            this.state.horoscopes[player.ZodiacSign].specialAPI.color
              .toUpperCase()
              .split(" ")
              .join("")
          ].rgb.b
      ) {
        return (currentGoals += 1);
      }
      return currentGoals;
    }, 0);
    console.log("color goals: ", goals);
    return goals;
  };

  moodScore = () => {
    // Scoring by moods
    let startingTeam1 = this.state.teams[this.state.selectedTeam1];
    let moodGoals = 0;

    const moods = [
      "Creative",
      "Energetic",
      "Cautious",
      "Collaborative",
      "Mellow",
      "Hopeful",
      "Focus",
      "Relaxed",
      "Sweet",
      "Serious",
      "Responsible",
    ];

    startingTeam1.forEach((player) => {
      let numberCharacters = player.Name.split(" ").join("").length;
      let playerMood = moods[numberCharacters % moods.length];
      // console.log(player, numberCharacters, playerMood);
      if (
        playerMood === this.state.horoscopes[player.ZodiacSign].specialAPI.mood
      ) {
        moodGoals += 1;
      }
      // else {
      //   console.log("no goal");
      // }
    });
    console.log("mood goals: ", moodGoals);
    return moodGoals;
  };

  luckyTimeScore = () => {
    let startingTeam1 = this.state.teams[this.state.selectedTeam1];
    let luckyTimeGoals = 0;
    // Scoring by Lucky Time
    startingTeam1.forEach((player) => {
      if (
        this.state.hour ===
        this.state.horoscopes[player.ZodiacSign].specialAPI.lucky_time
      ) {
        console.log((luckyTimeGoals += 1));
        return (luckyTimeGoals += 1);
      }
    });
    console.log("lucky time goasl", luckyTimeGoals);
    return luckyTimeGoals;
  };

  //TEAM 2
  colorScore = () => {
    let startingTeam2 = this.state.teams[this.state.selectedTeam2];
    console.log(colors, startingTeam2);
    let goals = startingTeam2.reduce((currentGoals, player) => {
      console.log(
        colors[
          this.state.horoscopes[player.ZodiacSign].specialAPI.color
            .toUpperCase()
            .split(" ")
            .join("")
        ],
        this.state.horoscopes[player.ZodiacSign].specialAPI.color
          .toUpperCase()
          .split(" ")
          .join("")
      );
      if (
        player.JerseyColor ===
        this.state.horoscopes[player.ZodiacSign].specialAPI.color
          .split(" ")
          .join("")
      ) {
        return (currentGoals += 2);
      } else if (
        colors[player.JerseyColor.toUpperCase()].rgb.r +
          colors[player.JerseyColor.toUpperCase()].rgb.g +
          colors[player.JerseyColor.toUpperCase()].rgb.b >
        colors[
          this.state.horoscopes[player.ZodiacSign].specialAPI.color
            .toUpperCase()
            .split(" ")
            .join("")
        ].rgb.r +
          colors[
            this.state.horoscopes[player.ZodiacSign].specialAPI.color
              .toUpperCase()
              .split(" ")
              .join("")
          ].rgb.g +
          colors[
            this.state.horoscopes[player.ZodiacSign].specialAPI.color
              .toUpperCase()
              .split(" ")
              .join("")
          ].rgb.b
      ) {
        return (currentGoals += 1);
      }
      return currentGoals;
    }, 0);
    console.log("color goals: ", goals);
    return goals;
  };

  moodScore = () => {
    // Scoring by moods
    let startingTeam2 = this.state.teams[this.state.selectedTeam2];
    let moodGoals = 0;

    const moods = [
      "Creative",
      "Energetic",
      "Cautious",
      "Collaborative",
      "Mellow",
      "Hopeful",
      "Focus",
      "Relaxed",
      "Sweet",
      "Serious",
      "Responsible",
    ];

    startingTeam2.forEach((player) => {
      let numberCharacters = player.Name.split(" ").join("").length;
      let playerMood = moods[numberCharacters % moods.length];
      // console.log(player, numberCharacters, playerMood);
      if (
        playerMood === this.state.horoscopes[player.ZodiacSign].specialAPI.mood
      ) {
        moodGoals += 1;
      }
      // else {
      //   console.log("no goal");
      // }
    });
    console.log("mood goals: ", moodGoals);
    return moodGoals;
  };

  luckyTimeScore = () => {
    let startingTeam2 = this.state.teams[this.state.selectedTeam2];
    let luckyTimeGoals = 0;
    // Scoring by Lucky Time
    startingTeam2.forEach((player) => {
      if (
        this.state.hour ===
        this.state.horoscopes[player.ZodiacSign].specialAPI.lucky_time
      ) {
        console.log((luckyTimeGoals += 1));
        return (luckyTimeGoals += 1);
      }
    });
    console.log("team 2 lucky time goals", luckyTimeGoals);
    return luckyTimeGoals;
  };

  scoreGoal = () => {
    //Using color, compatibility, lucky_number, lucky_time, mood from specialAPI(in horoscopeData.json)//

    let team1Score = 0;

    team1Score += this.colorScore();
    console.log("current goals: ", team1Score);
    team1Score += this.moodScore();
    console.log("current goals: ", team1Score);
    team1Score += this.luckyTimeScore();
    console.log("current goals: ", team1Score);

    let team2Score = 0;

    team2Score += this.colorScore();
    console.log("current goals: ", team2Score);
    team2Score += this.moodScore();
    console.log("current goals: ", team2Score);
    team2Score += this.luckyTimeScore();
    console.log("current goals: ", team2Score);

    console.log("cross your toes and hairs ", team1Score);
    console.log("cross your toes and hairs ", team2Score);

    this.setState({
      team1Score,
      team2Score,
    });
  };

  displayFinalScore = () => {
    return (
      <div className="">
        <h2>"The predicted score for this match is:"</h2>
        <div className="">
          <div className="team1Score">
            <h4>{this.state.selectedTeam1}</h4>
            <p>{this.state.team1Score}</p>
          </div>
          <div className="team2Score">
            <h4>{this.state.selectedTeam2}</h4>
            <p>{this.state.team2Score}</p>
          </div>
        </div>
      </div>
    );
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
    // console.log(this.state);
    // console.log(this.props);
    const team1AllData = this.state.display
      ? this.displayTeam(this.state.selectedTeam1)
      : "";
    const team1Imgs = team1AllData.slice(1);
    const wordCloud = team1AllData[0];
    return (
      <div>
        <header
          className="banner"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${image})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Header></Header>
          <div className="banner__content">
            <form action="/action_page.php" onSubmit={this.submitForm}>
              <fieldset>
                <legend>
                  <span className="number">1</span>Please choose your teams for
                  the match
                </legend>
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
                <select
                  name="selectedTeam2"
                  id="team2"
                  onChange={this.onChangeHandler}
                >
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
                  onChange={this.onChangeHandler}
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
                <select name="hour" id="" onChange={this.onChangeHandler}>
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
          <div className="banner--fadeBottom" />
        </header>
        <div className="row">
          <h2>Team 1</h2>
          <div className="cards">{team1Imgs}</div>
        </div>
        <div className="row">
          <h2>Team 2</h2>
          <div className="cards">
            {this.state.display
              ? this.displayTeam(this.state.selectedTeam2)
              : ""}
          </div>
          {wordCloud}
        </div>
        <div>{this.state.display ? this.stadiumWeatherPanel() : ""}</div>
        <div>{this.state.display ? this.displayFinalScore() : ""}</div>
      </div>
    );
  }
}

export default GameSim;
