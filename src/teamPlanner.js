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

var selectedTeam = [["Bulbasaur", "Grass", "Poison"],["Charmander", "Fire", null],["Squirtle", "Water", null],["Pikachu", "Electric", null],[null, null, null],[null, null, null]];

class DrawSelection extends Component {
  render() {
    if (this.props.entry[0]){
      return(
        <img className="TeamMemberBack" src="../pokeball_icon.png" height="130" width="130" />
        <img className="TeamMemberImage" src={`../pokemonSprites/art/${this.props.entry[0].toLowerCase()}.png`} height="100" width="100"/>
        {this.props.entry[0]}
      );
    }
    }
  }


class DrawTeamSelection extends Component {
  render() {
    return(
    <div  className="TeamMember">
      {selectedTeam.map(entry => (
        <DrawSelection entry={entry} />
      ))}
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
      <img src={`../pokemonSprites/pixel/${this.props.entry.name.english.toLowerCase()}.png`} width="40px" height="30px" />
      </div>
      </a>
    );
  }
}

class DrawPokemonOptions extends Component {

  render() {
    return (
      <Row style={{transform: "translate(0px, -15px)"}}>
      {this.props.dex.map(entry => (
        <DrawPokemonOption key={entry.id} entry={entry}/>
      ))}
      </Row>
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

    fetch(`../pokemonData/dex-${this.props.game}.json`).then(res => {
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
}

    render() {
      if (this.state.isLoaded === true && (!this.state.fetchError)){
        // Set page title to the current course name
        document.title = "Pokémon " + this.state.gameData.gameName + " Team Planner";
        return(
        <div>
        <h>  Pokémon {this.state.gameData.gameName} </h>
        <div className="PartySelection"><DrawTeamSelection /></div>
            <div style={{
              "marginTop": "5%",
              "marginLeft": "10%",
              "marginRight": "10%",
              "fontWeight": "bold",
            }}>
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
