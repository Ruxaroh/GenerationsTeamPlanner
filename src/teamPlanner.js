import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSchool, faMapMarkerAlt, faChalkboardTeacher, faCoins, faLaptop } from '@fortawesome/free-solid-svg-icons'
import {
  Link, useHistory} from "react-router-dom";



  class teamPlanner extends Component {
    constructor(props) {
      super(props);
      // Set state to not loaded, no fetch error and default course data
      this.state = {
        isLoaded: false,
        fetchError: false,
        userData: {
        },
      }
    }

    render() {
      // Set page title to the current course name
      console.log(this.state.userData.id);
      document.title = "Team Builder | TestDex";
      return(
          <div>
          This is some test data
          </div>
        );
      }
    }

  export default teamPlanner;
