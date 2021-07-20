import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import { BrowserView, MobileView } from 'react-device-detect';
import * as shape from 'react-shapes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSchool, faMapMarkerAlt, faChalkboardTeacher, faCoins, faLaptop } from '@fortawesome/free-solid-svg-icons'
import { Link, useHistory, Route } from "react-router-dom";

import * as common from "../control/common";

import TeamPlanner from "../planner/TeamPlanner"

class Home extends Component {

  gameLink(game) {
    var source = "/gameIcons/cover-" + game + ".png";
    return (
      <div class="gameCoverImageContainer">
        <a href={"/" + game}>
          <img className="gameCoverImage" src={source} />
        </a>
      </div>
    );
  }


  render() {
    return (
      <div>
        <div className="menuSection">
          <div className="gameSelector">
            <div className="gen_box">
              <div className="generationText"> I </div>
              <div className="generationGames">
                {this.gameLink("red")}
                {this.gameLink("blue")}
                {this.gameLink("yellow")}
              </div>
            </div>

            <div className="gen_box">
              <div className="generationText"> II </div>
              <div className="generationGames">
                {this.gameLink("gold")}
                {this.gameLink("silver")}
                {this.gameLink("crystal")}
              </div>
            </div>


            <div className="gen_box">
              <div className="generationText"> III </div>
              <div className="generationGames">
                {this.gameLink("ruby")}
                {this.gameLink("sapphire")}
                {this.gameLink("emerald")}
                {this.gameLink("firered")}
                {this.gameLink("leafgreen")}
              </div>
            </div>


            <div className="gen_box">
              <div className="generationText"> IV </div>
              <div className="generationGames">
                {this.gameLink("diamond")}
                {this.gameLink("pearl")}
                {this.gameLink("platinum")}
                {this.gameLink("heartgold")}
                {this.gameLink("soulsilver")}
              </div>
            </div>


            <div className="gen_box">
              <div className="generationText"> V </div>
              <div className="generationGames">
                {this.gameLink("black")}
                {this.gameLink("white")}
                {this.gameLink("blacktwo")}
                {this.gameLink("whitetwo")}
              </div>
            </div>


            <div className="gen_box">
              <div className="generationText"> VI </div>
              <div className="generationGames">
                {this.gameLink("x")}
                {this.gameLink("y")}
                {this.gameLink("omegaruby")}
                {this.gameLink("alphasapphire")}
              </div>
            </div>


            <div className="gen_box">
              <div className="generationText"> VII </div>
              <div className="generationGames">
                {this.gameLink("sun")}
                {this.gameLink("moon")}
                {this.gameLink("ultrasun")}
                {this.gameLink("ultramoon")}
              </div>
            </div>


            <div className="gen_box">
              <div className="generationText"> VIII </div>
              <div className="generationGames">
                {this.gameLink("sword")}
                {this.gameLink("shield")}
                {this.gameLink("brilliantdiamond")}
                {this.gameLink("shiningpearl")}
              </div>
            </div>
          </div>
        <div style={{"border-bottom": "solid black 3px", "margin-top": "15px"}}/>
        </div>
        <div className="menuSection">
          The loaded teams will go here!
        </div>
      </div>
    );
  }

}

export default Home;
