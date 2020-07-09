import React, { Component } from "react";
import axios from "axios";
import soccer from "./csvjson.json";

class App extends Component {
  async componentDidMount() {
    let res = await axios.get(
      "https://cors-anywhere.herokuapp.com/https://horoscope-api.herokuapp.com/horoscope/year/libra"
    );
    console.log(res);
    console.log(soccer);
  }
  render() {
    return <div></div>;
  }
}

export default App;
