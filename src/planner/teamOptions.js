import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import {BrowserView, MobileView} from 'react-device-detect';
import * as shape from 'react-shapes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSchool, faMapMarkerAlt, faChalkboardTeacher, faCoins, faLaptop } from '@fortawesome/free-solid-svg-icons'
import { Link, useHistory, Route} from "react-router-dom";

import * as common from "../control/common";

function shouldRender(entry, teamID, teamData, filters){
  if(teamID.includes(entry.id)){
    return(false);
  }
  if(filters.evolved && entry.is_fullyEvolved != "1"){
    return(false);
  }
  if(filters.versionExclusive && entry.is_exclusiveLocked == "1"){
    return(false);
  }
  if(filters.legendary && entry.is_legendary == "1"){
    return(false);
  }
  if(filters.dupeType){
    for (var i = 0; i < teamData.length; i++){
      if (entry.type1 == teamData[i][1] || entry.type1 == teamData[i][2] ||
         ( entry.type2 != "" && (entry.type2 == teamData[i][1] || entry.type2 == teamData[i][2]))){
            return(false);
      }
    }
  }
  if (filters.filterType.includes(entry.type1) && (entry.type2 == "" || filters.filterType.includes(entry.type2))){
    return(false);
  }
  return(true);
}

class DrawPokemonOption extends Component {
  render() {
    if (shouldRender(this.props.entry, this.props.teamID, this.props.teamData, this.props.filters)){
      var CircleStyle = {
        background: common.Type2Color(this.props.entry.type1),
        border: `3px solid ${common.Type2Color(this.props.entry.type2)}`,
      };
      return(
        <div className="selectionImage" style={CircleStyle} onClick={() => this.props.addMember(this.props.entry.id)}>
        <img src={`${process.env.PUBLIC_URL}/pokemonSprites/pixel/${this.props.entry.name.toLowerCase()}.png`} width="40px" height="30px" />
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
        <DrawPokemonOption teamData={this.props.teamData} filters={this.props.filters} teamID={this.props.teamID} entry={entry} addMember={this.props.addMember}/>
      ))}
      </div>
    );
  }
}

export default DrawPokemonOptions
