import { ButtonGroup } from 'react-bootstrap/ButtonGroup'
import InputGroup from 'react-bootstrap/InputGroup'
/* eslint-disable */
import * as RB from 'react-bootstrap';

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Box from '@material-ui/core/Box';
import Form from 'react-bootstrap/Form'
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import FormControl from "react-bootstrap/FormControl";
import { Col, Row } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import SopModal from './Modal'

import moment from 'moment'

export default class ApplicantMyApps extends Component {

    state ={
        email : "",
        apps : []
    }

    componentDidMount(){
        const newUser = {
            email: localStorage.getItem("email"),
            type: localStorage.getItem("type")
        };
        if (newUser.type !== "Applicant") this.props.history.push("/");

        this.setState({ email: newUser.email });
        console.log("hello?")

        axios.
            post("http://localhost:5000/applicant/MyApps",newUser)
            .then(response => {
                console.log(response.data)
                this.setState({apps: response.data });
                console.log('done')

            })
            .catch(function (error) {
                console.log(error);
            });
    
    }

    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Nav className="mr-auto">
                        <Link to="/SearchJob" className="navbar-brand">Search Job</Link>
                        <li className="navbar-item">
                            <Link to="/ApplicantHome" className="nav-link">Home</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/ViewMyApps" className="nav-link">My Applications</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/ApplicantProfile" className="nav-link">Profile</Link>
                        </li>
                    </Nav>

                    <Link to="/" className="nav-link">Logout</Link>
                </Navbar>
                <br /><br /><br /><br />
                <h1 style={{ textAlign: "center" }}>My Applications</h1><br />
                <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Date of Joining</th>
                        <th>Salary</th>
                        <th>Recruiter</th>
                        <th>Application Status</th>
                        <th>Job status</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.apps.map((app,idx) =>{

                    return(
                        <tr>
                            <td>{this.state.apps[idx].title}</td>
                            <td>{moment(this.state.apps[idx]).join.format("DD/MM/YY")}</td>
                            <td>{this.state.apps[idx].salary}</td>
                            <td>{this.state.apps[idx].recruiter}</td>
                            

                            {this.state.apps[idx].status === 'Applied' && <td><Button variant="outline-info" value="edit">Applied</Button></td> }
                            {this.state.apps[idx].status === 'Shortlisted' && <td><Button variant="outline-warning" value="edit">Shortlisted</Button></td> }
                            {this.state.apps[idx].status === 'Accepted' && <td><Button variant="outline-success" value="edit">Accepted</Button></td> }
                            {this.state.apps[idx].status === 'Rejected' && <td><Button variant="outline-danger" value="edit">Rejected</Button></td> }


                            <td>{this.state.apps[idx].job_status}</td>

                        </tr>
                    )
                })}
                </tbody>
                </table>
            </div>
        )
    }
}

