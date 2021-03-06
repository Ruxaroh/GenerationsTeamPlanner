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

  for (var i = 0; i < teamID.length; i++){
    if (teamID[i][0] == entry.id && teamID[i][1] == entry.form){
      return(false);
    }
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
      if (teamData[i]){
      if (entry.type1 == teamData[i].type1 || entry.type1 == teamData[i].type2 ||
         ( entry.type2 != "" && (entry.type2 == teamData[i].type1 || entry.type2 == teamData[i].type2))){
            return(false);
      }
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
      var form;
      if (this.props.entry.form == "0"){
        form = "";
      } else {
        form = this.props.entry.form;
      }
      return(
        <div title={this.props.entry.name} className="selectionImage" onClick={() => this.props.addMember(this.props.entry.id,this.props.entry.form)}>
        <img src={`https://img.pokemondb.net/sprites/sword-shield/icon/${common.spriteNameTranslater(this.props.entry.name,this.props.entry.form)}.png`} />
        </div>
      );
    } else {
      return(null);
    }
  }
}

class DrawDex extends Component {

  render() {
    return(
      <div className="dexName">
      {this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1)}
      <div className="optionsBox">
      {this.props.dex.map(entry => (
        <DrawPokemonOption teamData={this.props.teamData} filters={this.props.filters} teamID={this.props.teamID} entry={entry} addMember={this.props.addMember} />
      ))}
      </div>
      </div>
    )
  }
}

class DrawPokemonOptions extends Component {

  render() {
    var dexs = []
    for (const [section, dex] of Object.entries(this.props.dex)){
      dexs.push([section, dex])
    }
    return (
      <div>
        {dexs.map(Currdex => (
          <DrawDex name={Currdex[0]} dex={Currdex[1]} teamData={this.props.teamData} filters={this.props.filters} teamID={this.props.teamID} addMember={this.props.addMember}/>
        ))
      }
      </div>
    );
  }
}

export default DrawPokemonOptions
