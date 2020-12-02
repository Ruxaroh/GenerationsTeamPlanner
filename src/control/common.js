import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSchool, faMapMarkerAlt, faChalkboardTeacher, faCoins, faLaptop } from '@fortawesome/free-solid-svg-icons'
import {
  Link, useHistory} from "react-router-dom";

export function Type2Color(type){
  var typeDict = {
      "default": "#68A090",
      "bug": "#A8B820",
      "dark": "#705848",
      "dragon": "#7038F8",
      "electric": "#F8D030",
      "fairy": "#EE99AC",
      "fighting": "#C03028",
      "fire": "#F08030",
      "flying": "#A890F0",
      "ghost": "#705898",
      "grass": "#78C850",
      "ground": "#E0C068",
      "ice": "#98D8D8",
      "normal": "#A8A878",
      "poison": "#A040A0",
      "psychic": "#F85888",
      "rock": "#B8A038",
      "steel": "#B8B8D0",
      "water": "#6890F0",
    };

    if (!type){
      return(typeDict["default"])
    }
    return(typeDict[type.toLowerCase()])
}

  export class PageLoad extends Component {

    render() {
      var form = ""
      if (this.props.form != "0"){
        form = this.props.form;
      }
      return(
        <div class="Errorbox">
          <img class="errorImage" src={`/pokemonSprites/art/${this.props.loadingPokemon.toLowerCase().replace(".","").replace("'", "") + form}.png`} height="250px" width="250px" />
          <div class="msg">
            Loading, please wait!
            <ProgressBar max={this.props.max} min={0} now={this.props.now} />
          </div>
        </div>
      );
    }
  }

  export class ErrorPage extends Component {

    render() {
      // Set page title to the current course name
      document.title = "Something went wrong...";
      return(
        <div class="Errorbox">
          <img class="errorImage" src={"/pokemonSprites/art/rotom.png"} height="250px" width="250px" />
          <div class="msg">
            Huh, Something has gone wrong...
            <p>
            You probably want to go <a href={"/red"}>home</a> and try from there.
            </p>
            <p class="errorMessageTitle">
              This part is for nerds:{" "}
            </p>
            <p class="errorMessage">
              {this.props.error}
            </p>
          </div>
        </div>
        );
      }
    }
