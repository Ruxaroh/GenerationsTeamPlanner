import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import {BrowserView, MobileView} from 'react-device-detect';
import * as shape from 'react-shapes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSchool, faMapMarkerAlt, faChalkboardTeacher, faCoins, faLaptop } from '@fortawesome/free-solid-svg-icons'
import {
  Link, useHistory} from "react-router-dom";

import * as common from "./common";

import "./TeamPlanner.scss";

var selectedTeam = [];
var teamIDs = [];

function addPokemon(dex, id, state){
  for (var i = 0; i < 6; i++){
    if (selectedTeam[i][0] == null) {
      for (var d=0; d < dex.length; d++){
        if (id == dex[d].id) {
          selectedTeam[i] = [dex[d].name.english, dex[d].type[0], dex[d].type[1]]
        }
      }
      break;
      state.setState({ state: this.state });
    }
  }
  console.log(selectedTeam);
  return null;
}

class GetTypes extends Component {

  render(){
  if (this.props.entry[2]){
    return( <div>
      <BrowserView>
        <div className="typeDisplayDesktop">
          <img src={`../../GenerationsTeamBuilder/typeIcons/desktop/${this.props.entry[1].toLowerCase()}.png`} />
          <img src={`../../GenerationsTeamBuilder/typeIcons/desktop/${this.props.entry[2].toLowerCase()}.png`} />
        </div>
      </BrowserView>
      <MobileView>
      <div className="typeDisplayMobile">
        <img src={`../../GenerationsTeamBuilder/typeIcons/mobile/${this.props.entry[1].toLowerCase()}.png`} height="16" width="16" />
        <img src={`../../GenerationsTeamBuilder/typeIcons/mobile/${this.props.entry[2].toLowerCase()}.png`} height="16" width="16" />
      </div>
      </MobileView>
    </div>
    );
  } else if(this.props.entry[1]){
    return(
      <div>
      <BrowserView>
        <div className="typeDisplayDesktop">
          <img src={`../../GenerationsTeamBuilder/typeIcons/desktop/${this.props.entry[1].toLowerCase()}.png`} />
        </div>
      </BrowserView>
      <MobileView>
      <div className="typeDisplayMobile">
        <img src={`../../GenerationsTeamBuilder/typeIcons/mobile/${this.props.entry[1].toLowerCase()}.png`} height="16" width="16" style={{  left: "12px"}} />
      </div>
      </MobileView>
    </div>
    );
  } else {
    return (null);
  }
}
}

class GetImages extends Component {
  render(){
    return(
    <div>
    <BrowserView className="BrowserView">
      <div className="OptionImages">
        <img className="SelectionBaseImage" src="../../GenerationsTeamBuilder/pokeball_icon.png" height="130" width="130" />
        <img className="SelectionChoiceImage" src={`../../GenerationsTeamBuilder/pokemonSprites/art/${this.props.name}.png`} height="100" width="100" style={{left: "15px", top: "15px"}}/>
      </div>
    </BrowserView>
    <MobileView>
      <div className="OptionImages">
        <img className="SelectionChoiceImage" src={`../../pokemonSprites/pixel/${this.props.name}.png`} style={{imageRendering: "pixel", marginTop: "30px"}}/>
      </div>
    </MobileView>
    </div>
  );
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
        <BrowserView style={{width:"130px"}}>
              <div className="SelectionText">
                {text}
              </div>
              <GetImages name={name} />
              <GetTypes entry={this.props.entry} />
        </BrowserView>
        <MobileView>
            <GetImages name={name} />
            <GetTypes entry={this.props.entry} />
        </MobileView>
      </div>
      );
    }
  }



class DrawTeamSelection extends Component {
  render() {
    return(
      <div className="TeamMemberWrapper">
      <BrowserView>
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
      </BrowserView>
      <MobileView>
      <div className="TeamMembers" style={{justifyContent: "space-evenly", marginRight: "20px", height: "40px"}}>
        <DrawSelection entry={selectedTeam[0]} />
        <DrawSelection entry={selectedTeam[1]} />
        <DrawSelection entry={selectedTeam[2]} />
        <DrawSelection entry={selectedTeam[3]} />
        <DrawSelection entry={selectedTeam[4]} />
        <DrawSelection entry={selectedTeam[5]} />
      </div>
      </MobileView>
    </div>
    );
  }
}

class DrawPokemonOption extends Component {
  render() {
    if (!( teamIDs.includes(this.props.entry.id))){
      var CircleStyle = {
        background: common.Type2Color(this.props.entry.type[0]),
        border: `3px solid ${common.Type2Color(this.props.entry.type[1])}`,
      };

      return(
        <div className="selectionImage" style={CircleStyle} onClick={() => addPokemon(this.props.dex, this.props.entry.id, this.props.state)}>
        <img src={`../../pokemonSprites/pixel/${this.props.entry.name.english.toLowerCase()}.png`} width="40px" height="30px" />
        </div>
      );
    } else {
      return(null);
    }
  }
}

class DrawPokemonOptions extends Component {

  render() {
    return (
      <div className="optionsBox">
      {this.props.dex.map(entry => (
        <DrawPokemonOption state={this.props.state} dex={this.props.dex} key={entry.id} entry={entry}/>
      ))}
      </div>
    );
  }
}


class TeamPlanner extends Component {

constructor(props) {
  super(props);
  this.state = {
    dataLoaded: false,
    isLoaded: false,
    teamData: {
    },
    gameData: {
    },
  }
}

  componentDidMount() {

    fetch(`../../GenerationsTeamBuilder/pokemonData/dex-${this.props.game}.json`).then(res => {
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
                selectedTeam.push([json.dex[dex].name.english,
                                   json.dex[dex].type[0],
                                   json.dex[dex].type[1]]);
                teamIDs.push(json.dex[dex].id);
                break;
              }
            }
          }

          for(var i = selectedTeam.length; i < 6; i++){
            selectedTeam.push([null,null,null]);
          }
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

handler() {
  this.setState(this.setState)
}

    render() {
      if (this.state.isLoaded === true && (!this.state.fetchError)){
        // Set page title to the current course name
        document.title = "Pokémon " + this.state.gameData.gameName + " Team Planner";
        return(
        <div className="teamPlannerPage">
      <div className="titleText">Pokémon {this.state.gameData.gameName}</div>
          <DrawTeamSelection />
          <div style={{marginLeft: "5%", marginRight: "5%"}}>
            Avaliable Options
            <hr style={{transform: "translate(0px, -15px)"}} />
          </div>
            <DrawPokemonOptions state={this.handler} dex={this.state.gameData.dex} />
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
