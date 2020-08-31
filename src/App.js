// Core react imports
import React from "react";
import {
  Route,
  NavLink,
  Switch,
  useParams,
  Redirect
} from "react-router-dom";

// React bootstrap imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// Pages
import TeamPlanner from "./TeamPlanner";
import Home from "./Home";

import * as common from './common';

// navbar
import NavBar from './NavBar';

// Styling
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

//Load pages with data

function LoadTeamPlanner() {
  let { game } = useParams();
  return (
    <TeamPlanner game={game} team={"000000000000000000000000"}/>
  );
}

function LoadTeamPlannerCoded() {
  let { game, teamCode } = useParams();
  return (
    <TeamPlanner game={game} team={teamCode}/>
  );
}

// The entire app
const App = () => (
  <>
  <NavBar />
  <div className="page_break" />
  <Container fluid>
  <Switch>
    <Route exact path="/" children={<Home />} />
    <Route path="/teamPlanner/:game/:teamCode" children={<LoadTeamPlannerCoded />} />
    <Route path="/teamPlanner/:game" children={<LoadTeamPlanner />} />
    <Route children={<common.ErrorPage error="Page not Found" />} />
  </Switch>
  </Container>
  </>
  );

export default App;
