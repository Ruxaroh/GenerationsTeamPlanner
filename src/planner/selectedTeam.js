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
          <div className="TypeImage"> <img src={`/typeIcons/desktop/${this.props.entry.type1.toLowerCase()}.png`} /> </div>
          <div className="TypeImage"> <img src={`/typeIcons/desktop/${this.props.entry.type2.toLowerCase()}.png`} /> </div>
      </BrowserView>
      <MobileView>
      <div className="TypeImage">
        <img src={`/typeIcons/mobile/${this.props.entry.type1.toLowerCase()}.png`} height="16" width="16" style={{  left: "12px"}}/>
        <img src={`/typeIcons/mobile/${this.props.entry.type2.toLowerCase()}.png`} height="16" width="16" style={{  left: "12px"}}/>
      </div>
      </MobileView>
    </div>
    );
  } else {
    return(
      <div>
      <BrowserView>
        <div className="TypeImage"> <img src={`/typeIcons/desktop/${this.props.entry.type1.toLowerCase()}.png`} /> </div>
      </BrowserView>
      <MobileView>
      <div className="TypeImage"> <img src={`/typeIcons/mobile/${this.props.entry.type1.toLowerCase()}.png`} height="16" width="16" style={{  left: "12px"}} /> </div>
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
    <div className="memberArt">
    <BrowserView>
      <img src={`https://img.pokemondb.net/sprites/${this.props.album}/normal/${common.spriteNameTranslater(this.props.name, this.props.form)}.png`} height="100" width="100"/>
    </BrowserView>
    <MobileView>
      <img src = {`https://img.pokemondb.net/sprites/sword-shield/icon/${common.spriteNameTranslater(this.props.name, this.props.form)}.png`} width="55px" style={{imageRendering: "pixel"}}/>
    </MobileView>
    </div>
  );
  }
}

class DrawSelection extends Component {
  render() {
    if (this.props.entry){
      var form;
      if (this.props.entry.form == "0"){
        form = "";
      } else {
        form = this.props.entry.form;
      }

      return(
      <div className="TeamMember" onClick={() => this.props.removeMember(this.props.entry.id, this.props.entry.form)}>
        <BrowserView> {this.props.entry.name.replace("_"," ")} </BrowserView>
        <GetImages name={this.props.entry.name} album={this.props.album} form={form}/>
        <GetTypes entry={this.props.entry} />
      </div>
      );
    } else {
      return(null);
    }
  }
}

class DrawTeamSelection extends Component {
  render() {
    var height = "200px";
    if (window.innerWidth < 750 ){
      height = "400px";
    }
    if (window.mobileCheck()){
      height = "80px";
    }
    if (! this.props.teamData[0]){
      return(
        <div className="TeamMembersWrapper" style={{height: "130px"}}>
          <div className="emptyTeam">
            <GetImages name={"trubbish"} album={'black-white'} form={""}/>
            Your team is empty. Select an option from below and it will show up here!
          </div>
        </div>
      );
    } else {
    return(
      <div className="TeamMembersWrapper" style={{height:height}}>
      <div className="TeamMembers">
        <Row className="MemberGroup">
          <DrawSelection album={this.props.album} removeMember = {this.props.removeMember} entry={this.props.teamData[0]} />
          <DrawSelection album={this.props.album} removeMember = {this.props.removeMember} entry={this.props.teamData[1]} />
          <DrawSelection album={this.props.album} removeMember = {this.props.removeMember} entry={this.props.teamData[2]} />
        </Row>
        <Row className="MemberGroup">
          <DrawSelection album={this.props.album} removeMember = {this.props.removeMember} entry={this.props.teamData[3]} />
          <DrawSelection album={this.props.album} removeMember = {this.props.removeMember} entry={this.props.teamData[4]} />
          <DrawSelection album={this.props.album} removeMember = {this.props.removeMember} entry={this.props.teamData[5]} />
        </Row>
      </div>
    </div>
    );
  }
  }
}

export default DrawTeamSelection;
