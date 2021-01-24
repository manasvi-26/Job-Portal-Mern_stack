import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Box from '@material-ui/core/Box';

export default class ApplicantHome extends Component {

    
  render() {
    return (
      <div>
       <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
                <Link to="/ApplicantHome" className="navbar-brand">Home</Link>
                <li className="navbar-item">
                    <Link to="/ApplicantProfile" className="nav-link">Profile</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/MyApps" className="nav-link">My Applications</Link>
                </li>                 
                <li className="navbar-item">
                    <Link to="/SearchJob" className="nav-link">Search Job</Link>
                </li>
            </Nav>

            <Link to="/" className="nav-link">Logout</Link>    
        </Navbar>
        <br/><br/><br/><br/>
        <h1 style={{textAlign:"center"}}>Welcome {localStorage.getItem("username")} !!</h1>
        <br/>
        <h3 style={{textAlign:"center"}}>You are an applicant</h3>
      </div>

    );
  }
}
