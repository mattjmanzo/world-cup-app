import React, { Component } from "react";
import { Link } from "react-router-dom";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Link to="/game-sim">
          <h1>Game Sim</h1>
        </Link>
      </div>
    );
  }
}

export default LandingPage;
