import React, { Component } from "react";
import axios from "axios";
import soccer from "./csvjson.json";
import Sentiment from "sentiment";

var sentiment = new Sentiment();
var result = sentiment.analyze("Dogs are awesome.");
console.dir(result);

class App extends Component {
  async componentDidMount() {
    let res = await axios.get(
      "https://cors-anywhere.herokuapp.com/https://horoscope-api.herokuapp.com/horoscope/year/libra"
    );

    console.log(res);
    console.log(res.data.horoscope);
    let horoscope = sentiment.analyze(res.data.horoscope);
    console.log(horoscope);
    console.log(soccer);
  }
  render() {
    return <div></div>;
  }
}

export default App;
