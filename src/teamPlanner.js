import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import * as shape from 'react-shapes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSchool, faMapMarkerAlt, faChalkboardTeacher, faCoins, faLaptop } from '@fortawesome/free-solid-svg-icons'
import {
  Link, useHistory} from "react-router-dom";

import * as common from "./common";

import "./TeamPlanner.scss";

var selectedTeam = [["Charizard", "Fire", "Flying"],["Pidgeot", "Normal", "Flying"],["Nidoking", "Poison", "Ground"],["Poliwrath", "Water", "Fighting"],["Exeggutor", "Grass", "Psychic"],["Jolteon", "Electric", null]];



class GetTypes extends Component {

  render(){
  if (this.props.entry[2]){
    return( <div className="typeDisplay">
    <img src={`../../typeIcons/${this.props.entry[1].toLowerCase()}.png`} />
    <img src={`../../typeIcons/${this.props.entry[2].toLowerCase()}.png`} />
    </div>);
  } else if(this.props.entry[1]){
    return(<div className="typeDisplay">
    <img src={`../../typeIcons/${this.props.entry[1].toLowerCase()}.png`} />
    </div>);
  } else {
    return (null);
  }
}
}

class DrawSelection extends Component {

  render() {
    if (this.props.entry[0]){
      var name = this.props.entry[0];
      var text = this.props.entry[0];
    } else  {
      var name = "unown";
      var text = "???";
    }
      return(
        <div className="TeamMember">
          <div className="SelectionText">
            {text}
          </div>
          <div className="OptionImages">
            <img className="SelectionBaseImage" src="../../pokeball_icon.png" height="130" width="130" />
            <img className="SelectionChoiceImage" src={`../../pokemonSprites/art/${name}.png`} height="100" width="100"/>
          </div>
            <GetTypes entry={this.props.entry} />
        </div>
      );
    }
  }



class DrawTeamSelection extends Component {
  render() {
    return(
    <div className="TeamMembers">
      <Row style={{width: "450px", display: "flex", justifyContent: "center"}}>
        <DrawSelection entry={selectedTeam[0]} />
        <DrawSelection entry={selectedTeam[1]} />
        <DrawSelection entry={selectedTeam[2]} />
      </Row>
      <Row>
        <DrawSelection entry={selectedTeam[3]} />
        <DrawSelection entry={selectedTeam[4]} />
        <DrawSelection entry={selectedTeam[5]} />
      </Row>
    </div>
    );
  }
}

class DrawPokemonOption extends Component {
  render() {
    var CircleStyle = {
      background: common.Type2Color(this.props.entry.type[0]),
      border: `3px solid ${common.Type2Color(this.props.entry.type[1])}`,
    };

    return(
      <a href={`#${this.props.entry.name.english}`}>
      <div className="selectionImage" style={CircleStyle}>
      <img src={`../../pokemonSprites/pixel/${this.props.entry.name.english.toLowerCase()}.png`} width="40px" height="30px" />
      </div>
      </a>
    );
  }
}

class DrawPokemonOptions extends Component {

  render() {
    return (
      <div style={{transform: "translate(0px, -15px)", display: "flex", flexWrap: "wrap"}}>
      {this.props.dex.map(entry => (
        <DrawPokemonOption key={entry.id} entry={entry}/>
      ))}
      </div>
    );
  }
}


class TeamPlanner extends Component {

constructor(props) {
  super(props);
  this.state = {
    isLoaded: false,
    gameData: {
    },
  }
}

  componentDidMount() {

    fetch(`../../pokemonData/dex-${this.props.game}.json`).then(res => {
      return(res.json());
        }).then(json => {
          this.setState({
            isLoaded: true,
            gameData: json
          });
        }).catch((error) => {
          this.setState({
            isLoaded: true,
            fetchError: error
          });
      });

      console.log(this.props.team[0,4])
}

    render() {
      if (this.state.isLoaded === true && (!this.state.fetchError)){
        // Set page title to the current course name
        document.title = "Pokémon " + this.state.gameData.gameName + " Team Planner";
        return(
        <div>
          <div className="PartyDisplay">
            <DrawTeamSelection />
          </div>
          <div className="partyOptions">
            Avaliable Options<hr style={{transform: "translate(0px, -15px)"}} />
            <DrawPokemonOptions dex={this.state.gameData.dex} />
          </div>
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
