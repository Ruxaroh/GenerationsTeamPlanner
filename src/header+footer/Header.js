import React, { Component } from "react";
import Navbar from 'react-bootstrap/navbar'
import Nav from 'react-bootstrap/nav'
import {Link, useHistory} from "react-router-dom";
import ScrollContainer from 'react-indiana-drag-scroll';

// Styling
import 'bootstrap/dist/css/bootstrap.min.css';
// Game Icon Render

class NavBar extends Component {

  render() {
  return (
    <header className="header">
        <div>
        <a href="/"><img title="Home" className="homeButton" src="/home-icon.png"/></a>
        <h1 className="siteTitle">Generations Team Planner - Beta 0.2.0</h1>
        </div>
    </header>
  );
}
}

export default NavBar;