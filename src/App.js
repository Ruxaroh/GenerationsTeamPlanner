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
import CourseList from "./courseList";
import CourseSearchResults from "./courseSearchResults";
import CourseDetails from "./courseDetails";
import UserProfile from "./userProfile";
import TeamProfile from "./teamProfile";

// Utilities
import * as utils from './utilities';

// Styling
import './App.scss';

// The side navigation bar
const NavBar = () => {
  return (
    <div>
      <Nav as="nav" className="flex-column ct-navbar">
        {/* Header */}
        <h3 className="px-4 py-2 mx-auto my-0">SilverHalo</h3>
        <hr />
        {/* Home link */}
        <Nav.Item>
          <Nav.Link as={NavLink} exact to="/">
            All courses
          </Nav.Link>
        </Nav.Item>
        {/* Course details link */}
        {/* <Nav.Item>
          <Nav.Link as={NavLink} to="/course">
            Details
          </Nav.Link>
        </Nav.Item> */}
        {/* User profile link */}
        <Nav.Item>
          <Nav.Link as={NavLink} to="/account">
            User Account
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/team">
            Team Page
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {/* <div className="d-none d-md-block nav-bg"></div> */}
    </div>
  )
}


// Function component for course details page, with url params
function CourseDetailsWithParams() {
  // useParams hook to access the dynamic pieces of the URL
  let { id } = useParams();

  return (
    <CourseDetails id={id}></CourseDetails>
  );
}

// Function component for user profile page, with url params
function UserProfileWithParams() {
  // useParams hook to access the dynamic pieces of the URL
  let { id } = useParams();

  return (
    <UserProfile id={id}></UserProfile>
  );
}


// Function component for coures list page, with url params
function CourseListWithParams() {
  // useQuery hook to access the parameters in the URL
  let query = utils.useQuery();

  return (
    <CourseList page={parseInt(query.get("page"))} selectedCategory={query.get("cat")} query={query} update={false}></CourseList>
  );
}

// Function component for coures list page, with url params
function CourseSearchResultsListWithParams() {
  // useQuery hook to access the parameters in the URL
  let query = utils.useQuery();

  return (
    <CourseSearchResults searchTerm={query.get("query")} page={parseInt(query.get("page"))} selectedCategory={query.get("cat")} query={query} update={false}></CourseSearchResults>
  );
}

function TeamProfileWithParams() {
  // useParams hook to access the dynamic pieces of the URL
  let { id } = useParams();

  return (
    <TeamProfile id={id}></TeamProfile>
  );
}

// The entire app
const App = () => (
  <Container fluid>
    <a className="skip-link skip-to-content-link" href="#mainContent">
      Skip to content
    </a>
    <Row>
      {/* Side navbar */}
      <Col md={2} className="p-0">
        <NavBar></NavBar>
      </Col>
      {/* Main content */}
      <Col>
        <div className="content p-2 pt-4" id="content">
          <Switch>
            {/* The routes for course list and individual course details */}
            <Route exact path="/" children={<CourseListWithParams />} />
            <Route path="/course/:id" children={<CourseDetailsWithParams />} />
            <Route path="/search/course/" children={<CourseSearchResultsListWithParams />} />
            <Route exact path="/account" children={<Redirect to="/account/5f3263e4a116c512408d2556" />} />
            <Route path="/account/:id" children={<UserProfileWithParams />} />
            <Route exact path="/team" children={<Redirect to="/team/5f3265135c86e65b3434bbd0" />} />
            <Route path="/team/:id" children={<TeamProfileWithParams />} />
          </Switch>
        </div>
      </Col>
    </Row>
  </Container>
);

export default App;
