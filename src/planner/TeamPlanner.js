import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import {BrowserView, MobileView} from 'react-device-detect';
import * as shape from 'react-shapes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSchool, faMapMarkerAlt, faChalkboardTeacher, faCoins, faLaptop } from '@fortawesome/free-solid-svg-icons'
import {Link, useHistory, Route} from "react-router-dom";

import * as common from "../control/common";
import "./TeamPlanner.scss";

// Page Components
import DrawTeamSelection from './selectedTeam';
import DrawPokemonOptions from "./teamOptions";
import DrawFilters from "./filterOptions";

// TeamID from URL
var teamID = [];

const types = [
  "bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "fighting",
  "fire",
  "flying",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "poison",
  "psychic",
  "rock",
  "steel",
  "water",
];

class TeamPlanner extends Component {

constructor(props) {
  super(props);

  this.state = {
    imageLoadCount: 0,
    dataLoaded: false,
    isLoaded: false,
    teamData: [],
    gameData: {
    },
    filters: {
      evolved: false,
      versionExclusive: true,
      legendary: false,
      dupeType: false,
      filterType: [],
    }
  }
}

updateSelectedTeam() {
  var tmpTeamData = [];
  var found = false;

  for (var member = 0; member < teamID.length; member++){
    found = false;
    for (const [section, dex] of Object.entries(this.state.gameData.dexs)){
        for (var entry = 0; entry < dex.length; entry++){
          if (teamID[member][0] == dex[entry].id && teamID[member][1] == dex[entry].form){
            tmpTeamData.push(dex[entry])
            found = true;
            break;
          }
          if (found) {break;}
        }
      }
    }

    for (var count = tmpTeamData.length; count < 6; count++){
      tmpTeamData.push(null)
    }
    this.state.teamData = [... tmpTeamData];
}

updateFilter = (type) => {
  if (type == "evolved"){
    this.state.filters.evolved = !this.state.filters.evolved;
  }
  if (type == "versionExclusive"){
    this.state.filters.versionExclusive = !this.state.filters.versionExclusive;
  }
  if (type == "legendary"){
    this.state.filters.legendary = !this.state.filters.legendary;
  }
  if (type == "dupeType"){
    this.state.filters.dupeType = !this.state.filters.dupeType;
  }

  this.setState({});
 }

typeToggle = () => {
  for (var type = 0; type < types.length; type++){
    if (! this.state.filters.filterType.includes(types[type])){
      this.state.filters.filterType.push(types[type])
    } else {
      for (var i = 0; i < this.state.filters.filterType.length; i++){
        if(this.state.filters.filterType[i] == types[type]){
          this.state.filters.filterType.splice(i, 1);
        }
      }
    }
  }
  this.setState({});
}

 updateTypeFilter = (type) => {
   if (! this.state.filters.filterType.includes(type)){
     this.state.filters.filterType.push(type)
   } else {
     for (var i = 0; i < this.state.filters.filterType.length; i++){
       if(this.state.filters.filterType[i] == type){
         this.state.filters.filterType.splice(i, 1);
       }
     }
   }

   this.setState({});
 }

addMember = (id, form) => {
  var newTeam = "";
  if (teamID.length <= 5){
    teamID.push([id, form]);
   for (var i = 0; i < teamID.length; i++){
     newTeam = newTeam + teamID[i][0].toString().padStart(4, "0")  + teamID[i][1];
   }

 window.history.pushState({}, null, process.env.PUBLIC_URL + "/" + this.props.game + "/" + newTeam);
 this.setState({});
}
}

removeMember = (id, form) => {
  var newTeam = "";
  for (var i = 0; i < teamID.length; i++){
    if (teamID[i][0] == id && teamID[i][1] == form){
      teamID.splice(i,1);
      for (var i = 0; i < teamID.length; i++){
        newTeam = newTeam + teamID[i][0].toString().padStart(4, "0") + teamID[i][1];
      }

      window.history.pushState({}, null, process.env.PUBLIC_URL + "/" + this.props.game + "/" + newTeam);
      this.setState({});
    }
  }
}


  componentDidMount() {

    fetch(`${process.env.PUBLIC_URL}/pokemonData/dex-${this.props.game}.json`).then(res => {
      return(res.json());
        }).then(json => {

          var team = [parseInt(this.props.team.slice(0,4)),
                      parseInt(this.props.team.slice(5,9)),
                      parseInt(this.props.team.slice(10,14)),
                      parseInt(this.props.team.slice(15,19)),
                      parseInt(this.props.team.slice(20,24)),
                      parseInt(this.props.team.slice(25,29))]

          var teamForms = [this.props.team.slice(4,5),
                       this.props.team.slice(9,10),
                       this.props.team.slice(14,15),
                       this.props.team.slice(19,20),
                       this.props.team.slice(24,25),
                       this.props.team.slice(29,30)]

          var found = false;
          for (var code = 0; code < 6; code++){
            found = false;
            for (const [section, dex] of Object.entries(json.dexs)){
              for (var entry=0; entry < dex.length; entry++)
                if (team[code] == dex[entry].id && teamForms[code] == dex[entry].form) {
                  teamID.push([dex[entry].id, dex[entry].form]);
                  found = true;
                  break;
                }
                if (found) {
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
          <div className="teamPlanner" >
          <h1 className="titleText">
            Pokémon {this.state.gameData.gameName}
          </h1>
          <DrawTeamSelection teamData={this.state.teamData} album={this.state.gameData.album} removeMember={this.removeMember}/>
          <DrawFilters status={this.state.filters} updateFilter={this.updateFilter} updateTypeFilter={this.updateTypeFilter} typeToggle={this.typeToggle}/>
          <DrawPokemonOptions dex={this.state.gameData.dexs} teamData={this.state.teamData} teamID={teamID} filters={this.state.filters} addMember = {this.addMember} />
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
