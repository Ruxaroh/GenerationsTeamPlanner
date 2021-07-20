import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSchool, faMapMarkerAlt, faChalkboardTeacher, faCoins, faLaptop } from '@fortawesome/free-solid-svg-icons'
import {
  Link, useHistory} from "react-router-dom";

export function spriteNameTranslater(spriteName, formCode){
  //Correct Broken Names
  var newSprite = spriteName
                    .toLowerCase()
                    .replaceAll(".","")
                    .replaceAll("'", "")
                    .replaceAll(':','')
                    .replaceAll('_','-')
                    .replaceAll('é','e');
  //Account for forms and other unique exceptions to normal names
  if (newSprite == 'burmy'){
    if (formCode == 's'){
    return('burmy-sandy')
    }
    if (formCode == 't'){
    return('burmy-trash')
    }
  }
  if (newSprite == 'wormadam'){
    if (formCode == 's'){
    return('wormadam-sandy')
    }
    if (formCode == 't'){
    return('wormadam-trash')
    }
  }
  if (newSprite == 'rotom'){
    if (formCode == '0'){
    return('rotom')
    }
    if (formCode == 'h'){
    return('rotom-heat')
    }
    if (formCode == 'w'){
    return('rotom-wash')
    }
    if (formCode == 'i'){
    return('rotom-frost')
    }
    if (formCode == 'f'){
    return('rotom-fan')
    }
    if (formCode == 'g'){
    return('rotom-mow')
    }
  }
    if (newSprite == 'meloetta'){
      if (formCode == 'a'){
      return('meloetta-aria')
      }
      if (formCode == 'p'){
      return('meloetta-pirouette')
      }
  }
  if (newSprite == 'kyurem'){
    if (formCode == '0'){
    return('kyurem')
    }
    if (formCode == 'w'){
    return('kyurem-white')
    }
    if (formCode == 'b'){
    return('kyurem-black')
    }
}
if (newSprite == 'oricorio'){
  if (formCode == 'f'){
  return('oricorio')
  }
  if (formCode == 'e'){
  return('oricorio-pom-pom')
  }
  if (formCode == 'p'){
  return('oricorio-pau')
  }
  if (formCode == 'g'){
  return('oricorio-sensu')
  }
}
if (newSprite == 'necrozma'){
  if (formCode == '0'){
  return('necrozma')
  }
  if (formCode == 'm'){
  return('necrozma-dusk-mane')
  }
  if (formCode == 'w'){
  return('necrozma-dawn-wings')
  }
  if (formCode == 'u'){
  return('necrozma-ultra')
  }
}
if (newSprite == 'necrozma'){
  if (formCode == '0'){
  return('necrozma')
  }
  if (formCode == 'm'){
  return('necrozma-dusk-mane')
  }
  if (formCode == 'w'){
  return('necrozma-dawn-wings')
  }
  if (formCode == 'u'){
  return('necrozma-ultra')
  }
}
if (newSprite == 'urshifu'){
  if (formCode == 'r'){
  return('urshifu-rapid-strike')
  }
  if (formCode == 's'){
  return('urshifu-single-strike')
  }
}
if (newSprite == 'calyrex'){
  if (formCode == '0'){
  return('calyrex')
  }
  if (formCode == 's'){
  return('calyrex-ice-rider')
  }
  if (formCode == 'i'){
  return('calyrex-shadow-rider')
  }
}

  //Alolan and Galarian forms
  if (formCode == 'a') {
    newSprite = newSprite + '-alolan';
  }
  if (formCode == 'g'){
    newSprite = newSprite + '-galarian';
  }

  return(newSprite)
}

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
          <img class="errorImage" src={"/pokemonSprites/art/new/rotom.png"} height="250px" width="250px" />
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
