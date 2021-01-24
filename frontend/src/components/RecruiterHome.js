import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Box from '@material-ui/core/Box';
import axios from "axios";

export default class RecruiterHome extends Component {


  render() {
    return (
      <div>
       <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
                <Link to="/RecruiterHome" className="navbar-brand">Home</Link>
                <li className="navbar-item">
                    <Link to="/ActiveJobs" className="nav-link">Job Listings</Link>
                </li>   
                <li className="navbar-item">
                    <Link to="/CreateJob" className="nav-link">Create Job</Link>
                </li>   
                <li className="navbar-item">
                    <Link to="/RecruiterProfile" className="nav-link">My Profile</Link>
                </li>      
                <li className="navbar-item">
                    <Link to="Employees" className="nav-link">My Employees</Link>
                </li>     
            </Nav>
            <Link to="/" className="nav-link">Logout</Link>    
        </Navbar>
        <br/><br/><br/><br/>
        <h1 style={{textAlign:"center"}}>Welcome {localStorage.getItem("username")} !!</h1>
        <br/>
        <h2 style={{textAlign:"center"}}>You are a recruiter</h2>

      </div>

    );
  }
}
