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
import Nav from 'react-bootstrap/Nav';

// Pages
import teamPlanner from "./teamPlanner";

// Utilities
//import * as utils from './utilities';

// Styling
import './App.scss';



// The entire app
const App = () => (
  <Container fluid>
        <div className="content p-2 pt-4" id="content">
          <Switch>
            <Route exact path="/" />} />
            <Route path="/teamPlanner/:dex" />} />
          </Switch>
        </div>
  </Container>
);

export default App;
