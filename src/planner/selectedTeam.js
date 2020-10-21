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
  if (this.props.entry)  {
  if (this.props.entry.type2){
    return( <div>
      <BrowserView>
        <div className="typeDisplayDesktop">
          <img src={`/typeIcons/desktop/${this.props.entry.type1.toLowerCase()}.png`} />
          <img src={`/typeIcons/desktop/${this.props.entry.type2.toLowerCase()}.png`} />
        </div>
      </BrowserView>
      <MobileView>
      <div className="typeDisplayMobile">
        <img src={`/typeIcons/mobile/${this.props.entry.type1.toLowerCase()}.png`} height="16" width="16" />
        <img src={`/typeIcons/mobile/${this.props.entry.type2.toLowerCase()}.png`} height="16" width="16" />
      </div>
      </MobileView>
    </div>
    );
  } else {
    return(
      <div>
      <BrowserView>
        <div className="typeDisplayDesktop">
          <img src={`/typeIcons/desktop/${this.props.entry.type1.toLowerCase()}.png`} />
        </div>
      </BrowserView>
      <MobileView>
      <div className="typeDisplayMobile">
        <img src={`/typeIcons/mobile/${this.props.entry.type1.toLowerCase()}.png`} height="16" width="16" style={{  left: "12px"}} />
      </div>
      </MobileView>
    </div>
    );
  }
} else {
  return (null)}
}
}

class GetImages extends Component {
  render(){
    return(
    <div className="OptionImages">
    <BrowserView>
      <img className="SelectionBaseImage" src={"/pokeball_icon.png"} height="130" width="130" />
      <img className="SelectionChoiceImage" src={`/pokemonSprites/art/${this.props.name.toLowerCase().replace(".","").replace("'", "") + this.props.form}.png`} height="100" width="100" style={{left: "15px", top: "15px"}}/>
    </BrowserView>
    <MobileView>
      <img className="SelectionChoiceImage" src={`/pokemonSprites/pixel/${this.props.name.toLowerCase().replace(".","").replace("'", "") + this.props.form}.png`} style={{imageRendering: "pixel", marginTop: "30px"}}/>
    </MobileView>
    </div>
  );
  }
}

class DrawSelection extends Component {
  render() {
    if (this.props.entry){
      var name = this.props.entry.name;
      var text = this.props.entry.name.replace("_"," ");
      if (this.props.entry.form == "0"){
        var form = "";
      } else {
        var form = this.props.entry.form;
      }
    } else  {
      var name = "unown";
      var text = "???";
      var form = "";
    }
      return(
      <div className="TeamMember" onClick={() => this.props.removeMember(this.props.entry.id, this.props.entry.form)}>
        <BrowserView style={{width:"130px"}}>
              <div className="SelectionText">
                {text}
              </div>
              <GetImages name={name} form={form} />
              <GetTypes entry={this.props.entry} />
        </BrowserView>
        <MobileView>
            <GetImages name={name} form={form}/>
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
