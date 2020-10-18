import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import {BrowserView, MobileView} from 'react-device-detect';
import * as shape from 'react-shapes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSchool, faMapMarkerAlt, faChalkboardTeacher, faCoins, faLaptop } from '@fortawesome/free-solid-svg-icons'
import {
  Link, useHistory, Route} from "react-router-dom";

import * as common from "../control/common";
import "./TeamPlanner.scss";

// Page Components
import DrawTeamSelection from './selectedTeam';
import DrawPokemonOptions from "./teamOptions"

// TeamID from URL
var teamID = [];


class TeamPlanner extends Component {

constructor(props) {
  super(props);

  this.state = {
    dataLoaded: false,
    isLoaded: false,
    teamData: [],
    gameData: {
    },
  }
}

updateSelectedTeam() {
  var tmpTeamData = [];
    for (var member = 0; member < teamID.length; member++){
      for (var dex = 0; dex < this.state.gameData.dex.length; dex++){
        if (teamID[member] == this.state.gameData.dex[dex].id){
          tmpTeamData.push([this.state.gameData.dex[dex].name.english,
                            this.state.gameData.dex[dex].type[0],
                            this.state.gameData.dex[dex].type[1],
                            this.state.gameData.dex[dex].id])
        }
      }
    }

    for (var count = tmpTeamData.length; count < 6; count++){
      tmpTeamData.push([null,null,null,null])
    }
    this.state.teamData = [... tmpTeamData];
}

addMember = (id) => {
  var newTeam = "";
  if (teamID.length <= 5){
    teamID.push(id);
   for (var i = 0; i < teamID.length; i++){
     newTeam = newTeam + teamID[i].toString().padStart(4, "0");
   }

 window.history.pushState({}, null, process.env.PUBLIC_URL + "/" + this.state.gameData.gameName.toLowerCase() + "/" + newTeam);
 this.setState({});
}
}

removeMember = (id) => {
  var newTeam = "";
  for (var i = 0; i < teamID.length; i++){
    if (teamID[i] == id){
      teamID.splice(i,1);
      for (var i = 0; i < teamID.length; i++){
        newTeam = newTeam + teamID[i].toString().padStart(4, "0");
      }

      window.history.pushState({}, null, process.env.PUBLIC_URL + "/" + this.state.gameData.gameName.toLowerCase() + "/" + newTeam);
      this.setState({});
    }
  }
}


  componentDidMount() {

    fetch(`${process.env.PUBLIC_URL}/pokemonData/dex-${this.props.game}.json`).then(res => {
      return(res.json());
        }).then(json => {

          var team = [parseInt(this.props.team.slice(0,4)),
                      parseInt(this.props.team.slice(4,8)),
                      parseInt(this.props.team.slice(8,12)),
                      parseInt(this.props.team.slice(12,16)),
                      parseInt(this.props.team.slice(16,20)),
                      parseInt(this.props.team.slice(20,24))]
          for (var code = 0; code < 6; code++){
            for (var dex=0; dex < json.dex.length; dex++){
              if (team[code] == json.dex[dex].id) {
                teamID.push(json.dex[dex].id);
                break;
              }
            }
          }
          this.setState({
            isLoaded: true,
            gameData: json,
          });
        }).catch((error) => {
          this.setState({
            isLoaded: true,
            fetchError: error
          });
      });

      this.updateSelectedTeam();
}

    render() {
      this.updateSelectedTeam();
      if (this.state.isLoaded === true && (!this.state.fetchError)){
        // Set page title to the current course name
        document.title = "Pokémon " + this.state.gameData.gameName + " Team Planner";
        return(
        <div className="teamPlannerPage">
        <div className="titleText">
          Pokémon {this.state.gameData.gameName}
        </div>
        <DrawTeamSelection teamData={this.state.teamData} removeMember={this.removeMember}/>
        <DrawPokemonOptions dex={this.state.gameData.dex} teamID={teamID} addMember = {this.addMember} />
        </div>
          );
        } else if (this.state.fetchError) {
          return (<common.ErrorPage error={this.state.fetchError.message} />)
        } else {
          return (<div>Loading...</div>)
        }
      }
    }

  export default TeamPlanner;
