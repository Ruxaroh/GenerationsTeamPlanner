import React, { Component } from "react";
import Navbar from 'react-bootstrap/navbar'
import Nav from 'react-bootstrap/nav'
import {Link, useHistory} from "react-router-dom";
import ScrollContainer from 'react-indiana-drag-scroll';

// Styling
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.scss'

// Game Icon Render


// The navigation bar
class NavBar extends Component {

  gameLink(game){
      var source = process.env.PUBLIC_URL +"/gameIcons/cover-" + game + ".png";
      return(
        <a href={process.env.PUBLIC_URL + "/teamPlanner/"+game}>
        <img className="GameIcon" src={source} width="64px" height="64px" />
        </a>
      );
    }

    constructor(props) {
        super(props);
        this.state = { content: "Initialize" }

    }

  render() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        {/*<Navbar.Brand href="/">Generations Team Planner</Navbar.Brand>*/}
          <ScrollContainer style={{width:"100%"}} vertical={false}>
            <div className="gameSelector">
              <div className="gen_box">
              <Nav className="mr-auto">
              {this.gameLink("red")}
              {this.gameLink("blue")}
              <div className="in_gen_gap" />
              {this.gameLink("yellow")}
              </Nav>
              </div>

              <div className="gen_box">
              <Nav className="mr-auto">
              {this.gameLink("gold")}
              {this.gameLink("silver")}
              <div className="in_gen_gap" />
              {this.gameLink("crystal")}
              </Nav>
              </div>

              <div className="gen_box">
              <Nav className="mr-auto">
              {this.gameLink("ruby")}
              {this.gameLink("sapphire")}
              <div className="in_gen_gap" />
              {this.gameLink("emerald")}
              <div className="in_gen_gap" />
              {this.gameLink("firered")}
              {this.gameLink("leafgreen")}
              </Nav>
              </div>
            </div>
          </ScrollContainer>
        </Navbar>
    </div>
  );
}
}

export default NavBar;
