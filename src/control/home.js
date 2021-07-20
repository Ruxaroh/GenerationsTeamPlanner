import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import {BrowserView, MobileView} from 'react-device-detect';
import * as shape from 'react-shapes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSchool, faMapMarkerAlt, faChalkboardTeacher, faCoins, faLaptop } from '@fortawesome/free-solid-svg-icons'
import {Link, useHistory, Route} from "react-router-dom";

import * as common from "../control/common";

import TeamPlanner from "../planner/TeamPlanner"

class Home extends Component {

  gameLink(game){
      var source = "/gameIcons/cover-" + game + ".png";
      return(
        <a href={"/"+game}>
        <img className="GameIcon" src={source} height="64px" />
        </a>
      );
    }


  render() {
    return(
    <div>
      <div style={{marginBottom: "10%"}}>
        <h className="homeTitle"> Make a new team...</h>
        <div className="gameSelector">

          <div className="gen_box">
          {this.gameLink("red")}
          {this.gameLink("blue")}
          {this.gameLink("yellow")}
          </div>

          <div className="gen_box">
          {this.gameLink("gold")}
          {this.gameLink("silver")}
          {this.gameLink("crystal")}
          </div>

          <div className="gen_box">
          {this.gameLink("ruby")}
          {this.gameLink("sapphire")}
          {this.gameLink("emerald")}
          {this.gameLink("firered")}
          {this.gameLink("leafgreen")}
          </div>

          <div className="gen_box">
          {this.gameLink("diamond")}
          {this.gameLink("pearl")}
          {this.gameLink("platinum")}
          {this.gameLink("heartgold")}
          {this.gameLink("soulsilver")}
          </div>

          <div className="gen_box">
          {this.gameLink("black")}
          {this.gameLink("white")}
          {this.gameLink("blacktwo")}
          {this.gameLink("whitetwo")}
          </div>

          <div className="gen_box">
          {this.gameLink("x")}
          {this.gameLink("y")}
          {this.gameLink("omegaruby")}
          {this.gameLink("alphasapphire")}
          </div>

          <div className="gen_box">
          {this.gameLink("sun")}
          {this.gameLink("moon")}
          {this.gameLink("ultrasun")}
          {this.gameLink("ultramoon")}
          </div>

          <div className="gen_box">
          {this.gameLink("sword")}
          {this.gameLink("shield")}
          {this.gameLink("brilliantdiamond")}
          {this.gameLink("shiningpearl")}
          </div>
        </div>
      </div>
      <div>
        <h className="homeTitle"> ...or load an old one</h>
      </div>
    </div>
    );
  }

    }

  export default Home;
