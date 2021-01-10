import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import {BrowserView, MobileView} from 'react-device-detect';
import * as shape from 'react-shapes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSchool, faMapMarkerAlt, faChalkboardTeacher, faCoins, faLaptop } from '@fortawesome/free-solid-svg-icons'
import { Link, useHistory, Route} from "react-router-dom";

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

function getTooltipText(type, state){
  if (type == "evolved" && state){
    return("Show all evolutionary stages");
  }
  if (type == "evolved" && !state){
    return("Show only fully evolved Pokémon");
  }
  if (type == "versionExclusive" && state){
    return("Show version exclusives that are not obtainable in this game");
  }
  if (type == "versionExclusive" && !state){
    return("Hide version exclusives that are not obtainable in this game");
  }
  if (type == "legendary" && state){
    return("Show legendary Pokémon");
  }
  if (type == "legendary" && !state){
    return("Hide legendary Pokémon");
  }
  if (type == "dupeType" && state){
    return("Show Pokémon that share a type with a Pokémon already on your team");
  }
  if (type == "dupeType" && !state){
    return("Hide Pokémon that share a type with a Pokémon already on your team");
  }
}

class FilterType extends Component {

  render(){
    var style = {};
    if (this.props.status.includes(this.props.type)){
      style = {"filter": "invert(1)"}
    }

    return (
      <div className="typeOption" onClick={() => this.props.updateTypeFilter(this.props.type)}>
        <img style={style} src={`/typeIcons/mobile/${this.props.type}.png`} height="30" width="30" />
      </div>
    );
  }
}

class FilterOption extends Component {
  render(){

    var styleColour = "lightgray";
    if (this.props.status){
      styleColour = "black";
    }

    return(
      <div style={{"color":styleColour}}className="filterOption" onClick={() => this.props.updateFilter(this.props.type)}>
        <h1>{this.props.type.toUpperCase().charAt(0)}</h1>
        <span class="tooltiptext">{getTooltipText(this.props.type, this.props.status)}</span>
      </div>
    );
  }
}

class DrawFilters extends Component {

render() {
  return (
    <Row style={{"margin-left": "20px"}}>
      <FilterOption updateFilter={this.props.updateFilter} status={this.props.status.evolved} type={"evolved"}/>
      <FilterOption updateFilter={this.props.updateFilter} status={this.props.status.versionExclusive} type={"versionExclusive"}/>
      <FilterOption updateFilter={this.props.updateFilter} status={this.props.status.legendary} type={"legendary"}/>
      <FilterOption updateFilter={this.props.updateFilter} status={this.props.status.dupeType} type={"dupeType"}/>

      <div className="typeOptions">
        {types.map(type => (
          <FilterType updateTypeFilter={this.props.updateTypeFilter} type={type} status={this.props.status.filterType} />
        ))}
        <div className="toggleType" onClick={() => this.props.typeToggle()}>
          T
          <span class="tooltiptext">Toggle selected types</span>
        </div>
      </div>
    </Row>
  );
}
}

export default DrawFilters;
