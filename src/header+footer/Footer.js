import React, { Component } from "react";
import Navbar from 'react-bootstrap/navbar'
import Nav from 'react-bootstrap/nav'
import Row from 'react-bootstrap/Row';
import {Link, useHistory} from "react-router-dom";

// Styling
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.scss'

// Game Icon Render


// The navigation bar
class Footer extends Component {

  constructor(props) {
      super(props);
      this.state = { content: "Initialize" }

    }

  render() {
  return (
    <footer className="footer">
      <div className="legal">Pokémon is © of Nintendo, 1995 - 2021</div>
      <div className="legal">A webapp by <a href="https://twitter.com/Ruxaroh">Ruxaroh</a> || This app would not of been possible without <a href="https://bulbapedia.bulbagarden.net"> baulbapeida </a> ❤️</div>
    </footer>
  );
}
}

export default Footer;
