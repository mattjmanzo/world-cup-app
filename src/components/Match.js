import React, { Component } from "react";

class Match extends Component {
  //   async componentDidMount() {
  //     let res = await axios.get(
  //       "https://cors-anywhere.herokuapp.com/https://horoscope-api.herokuapp.com/horoscope/year/libra"
  //     );
  //     const promises = Argentina.StartingXI.map(async (player) => {
  //       let r = await axios.post(
  //         `https://aztro.sameerkumar.website/?sign=${player.ZodiacSign}&day=today`
  //       );
  //       console.log(r);
  //       let randomMood = {
  //         rmood: randomMoods[Math.floor(Math.random() * randomMoods.length)],
  //       };
  //       return { ...r.data, ...player, ...randomMood };
  //     });
  //     Promise.all(promises).then((infoData) => {
  //       console.log(infoData);
  //       this.setState({
  //         team: infoData,
  //       });
  //     });
  //     const promises = Argentina.StartingXI.map(async (player) => {
  //       let r = await axios.post(
  //         `https://aztro.sameerkumar.website/?sign=${player.ZodiacSign}&day=today`
  //       );
  //       console.log(r);
  //       let randomMood = {
  //         rmood: randomMoods[Math.floor(Math.random() * randomMoods.length)],
  //       };
  //       return { ...r.data, ...player, ...randomMood };
  //     });
  //     Promise.all(promises).then((infoData) => {
  //       console.log(infoData);
  //       this.setState({
  //         team: infoData,
  //       });
  //     });
  //     console.log(promises);
  //     console.log(res);
  //     console.log(res.data.horoscope);
  //     let horoscope = sentiment.analyze(res.data.horoscope);
  //     console.log(horoscope);
  //     console.log(soccer);
  //   }

  // showTeamData = () => {
  //   return this.props.choosenTeam1.StartingXI.map((eachPlayer) => {
  //     return (
  //       <li>
  //         <h4>{eachPlayer.Name}</h4>
  //         <img src={eachPlayer.PlayerPicture}></img>
  //         <h4>{eachPlayer.ZodiacSign}</h4>
  //       </li>
  //     );
  //   });
  // };

  render() {
    console.log(this.props.choosenTeam);
    return (
      <div>
        {/* HOLA */}
        {/* {this.props.choosenTeam.StartingXI.map((eachPlayer) => {
          return (
            <li>
              <h4>{eachPlayer.Name}</h4>
              <img src={eachPlayer.PlayerPicture}></img>
              <h4>{eachPlayer.ZodiacSign}</h4>
            </li>
          );
        })} */}
      </div>
    );
  }
}

export default Match;
