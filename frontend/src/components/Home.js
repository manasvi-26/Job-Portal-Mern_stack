import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Box from '@material-ui/core/Box';


export default class Home extends Component {


  componentDidMount() {
    localStorage.clear();
  }


  render() {
    return (
      <div>
       <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
                <Link to="/" className="navbar-brand">Home</Link>
                <li className="navbar-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li> 
                <li className="navbar-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>              
            </Nav>
        </Navbar>
        <br/><br/><br/><br/>
        <div style={{textAlign:"center"}}><h1>WELCOME!!</h1></div>
       
      </div>

    );
  }
}
