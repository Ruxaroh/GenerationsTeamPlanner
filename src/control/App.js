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

// Common
import * as common from '../control/common'

// navbar & Footer
import NavBar from '../header+footer/NavBar';
import Footer from '../header+footer/Footer';

// Styling
import 'bootstrap/dist/css/bootstrap.min.css';
import '../control/App.scss';

//Load Team Planner
import TeamPlanner from '../planner/TeamPlanner'


function LoadLiteTeamPlanner() {
  let { game } = useParams();
  let teamCode = [];
  return (
    <TeamPlanner game={game} team={[teamCode]}/>
  );
}

function LoadTeamPlanner() {
  let { game, teamCode } = useParams();
  return (
    <TeamPlanner game={game} team={teamCode}/>
  );
}

// The entire app
const App = () => (
  <div className="pageContainer">
    <div className="navWrap">
      <NavBar />
      </div>
      <div className="pageWrap">
        <Container fluid>
          <Switch>
            <Route exact path={process.env.PUBLIC_URL + "/"}> <Redirect to={process.env.PUBLIC_URL + "/red/"} /> </Route>
            <Route path={process.env.PUBLIC_URL + "/:game/:teamCode"} children={<LoadTeamPlanner />} />
            <Route path={process.env.PUBLIC_URL + "/:game"} children={<LoadLiteTeamPlanner />} />
            <Route children={<common.ErrorPage error="Page not Found" />} />
          </Switch>
        </Container>
      </div>
      <div className="footerWrap">
        <Footer />
      </div>
    </div>
  );

export default App;
