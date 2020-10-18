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

class DrawPokemonOption extends Component {
  render() {
    if (!( this.props.teamID.includes(this.props.entry.id))){
      var CircleStyle = {
        background: common.Type2Color(this.props.entry.type[0]),
        border: `3px solid ${common.Type2Color(this.props.entry.type[1])}`,
      };
      return(
        <div className="selectionImage" style={CircleStyle} onClick={() => this.props.addMember(this.props.entry.id)}>
        <img src={`${process.env.PUBLIC_URL}/pokemonSprites/pixel/${this.props.entry.name.english.toLowerCase()}.png`} width="40px" height="30px" />
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
        <DrawPokemonOption teamID={this.props.teamID} key={entry.id} entry={entry} addMember={this.props.addMember}/>
      ))}
      </div>
    );
  }
}

export default DrawPokemonOptions
