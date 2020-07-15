// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import Country from "./Country";
// import * as teams from "../teams";

// class LandingPage extends Component {
//   state = {
//     countries: teams,
//   };

//   // showTeamData = () => {
//   //   return this.state.countries.map((team) => {
//   //     return (
//   //       <li>
//   //         <img src={team.Flag}></img>
//   //       </li>
//   //     );
//   //   });
//   // };

//   render() {
//     console.log(this.state.countries);

//     return (
//       <div>
//         <Link to="/game-sim">
//           <h1>Game Sim</h1>
//         </Link>
//         {/* {this.showTeamData()} */}
//         <h1>Select two teams to play each other</h1>
//         <section className="cards">
//           <Country item={this.state.countries.Argentina}></Country>
//           <Country item={this.state.countries.Brazil}></Country>
//           <Country item={this.state.countries.Spain}></Country>
//         </section>
//       </div>
//     );
//   }
// }

// export default LandingPage;
