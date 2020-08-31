import React, { Component } from "react";
import Navbar from 'react-bootstrap/navbar'
import Nav from 'react-bootstrap/nav'
import {Link, useHistory} from "react-router-dom";

// Styling
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.scss'

// Game Icon Render


// The navigation bar
class Footer extends Component {

  gameLink(game){
      var source = "/gameIcons/cover-" + game + ".png";
      return(
        <a href={"/teamPlanner/"+game}>
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
      <Navbar bg="dark" variant="dark" className="footer">
      </Navbar>
    </div>
  );
}
}

export default Footer;
