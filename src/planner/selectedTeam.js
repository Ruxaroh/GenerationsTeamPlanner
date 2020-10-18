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

class GetTypes extends Component {

  render(){
  if (this.props.entry[2]){
    return( <div>
      <BrowserView>
        <div className="typeDisplayDesktop">
          <img src={`${process.env.PUBLIC_URL}/typeIcons/desktop/${this.props.entry[1].toLowerCase()}.png`} />
          <img src={`${process.env.PUBLIC_URL}/typeIcons/desktop/${this.props.entry[2].toLowerCase()}.png`} />
        </div>
      </BrowserView>
      <MobileView>
      <div className="typeDisplayMobile">
        <img src={`${process.env.PUBLIC_URL}/typeIcons/mobile/${this.props.entry[1].toLowerCase()}.png`} height="16" width="16" />
        <img src={`${process.env.PUBLIC_URL}/typeIcons/mobile/${this.props.entry[2].toLowerCase()}.png`} height="16" width="16" />
      </div>
      </MobileView>
    </div>
    );
  } else if(this.props.entry[1]){
    return(
      <div>
      <BrowserView>
        <div className="typeDisplayDesktop">
          <img src={`${process.env.PUBLIC_URL}/typeIcons/desktop/${this.props.entry[1].toLowerCase()}.png`} />
        </div>
      </BrowserView>
      <MobileView>
      <div className="typeDisplayMobile">
        <img src={`${process.env.PUBLIC_URL}/typeIcons/mobile/${this.props.entry[1].toLowerCase()}.png`} height="16" width="16" style={{  left: "12px"}} />
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
    <div className="OptionImages">
    <BrowserView>
      <img className="SelectionBaseImage" src={process.env.PUBLIC_URL + "/pokeball_icon.png"} height="130" width="130" />
      <img className="SelectionChoiceImage" src={`${process.env.PUBLIC_URL}/pokemonSprites/art/${this.props.name.toLowerCase()}.png`} height="100" width="100" style={{left: "15px", top: "15px"}}/>
    </BrowserView>
    <MobileView>
      <img className="SelectionChoiceImage" src={`${process.env.PUBLIC_URL}/pokemonSprites/pixel/${this.props.name.toLowerCase()}.png`} style={{imageRendering: "pixel", marginTop: "30px"}}/>
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
      <div className="TeamMember" onClick={() => this.props.removeMember(this.props.entry[3])}>
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
          <DrawSelection removeMember = {this.props.removeMember} entry={this.props.teamData[0]} />
          <DrawSelection removeMember = {this.props.removeMember} entry={this.props.teamData[1]} />
          <DrawSelection removeMember = {this.props.removeMember} entry={this.props.teamData[2]} />
        </Row>
        <Row>
          <DrawSelection removeMember = {this.props.removeMember} entry={this.props.teamData[3]} />
          <DrawSelection removeMember = {this.props.removeMember} entry={this.props.teamData[4]} />
          <DrawSelection removeMember = {this.props.removeMember} entry={this.props.teamData[5]} />
        </Row>
      </div>
      </BrowserView>
      <MobileView>
      <div className="TeamMembers" style={{justifyContent: "space-evenly", marginRight: "20px", height: "40px"}}>
        <DrawSelection removeMember = {this.props.removeMember} entry={this.props.teamData[0]} />
        <DrawSelection removeMember = {this.props.removeMember} entry={this.props.teamData[1]} />
        <DrawSelection removeMember = {this.props.removeMember} entry={this.props.teamData[2]} />
        <DrawSelection removeMember = {this.props.removeMember} entry={this.props.teamData[3]} />
        <DrawSelection removeMember = {this.props.removeMember} entry={this.props.teamData[4]} />
        <DrawSelection removeMember = {this.props.removeMember} entry={this.props.teamData[5]} />
      </div>
      </MobileView>
    </div>
    );
  }
}

export default DrawTeamSelection;
