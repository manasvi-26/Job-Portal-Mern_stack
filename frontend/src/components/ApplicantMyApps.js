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
import Table from 'react-bootstrap/Table'


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

    rateCalc = (rate_req) =>{
        
        var list = rate_req
   
        if(list.length == 0)return 0
        else{
            var sum = 0
            for(var i in list){
                sum += list[i].value
            }
            return (Math.round(sum * 100.0 / (list.length)) / 100)
        }
    }

    edit =(idx) =>{

        let apps = [...this.state.apps]
        let app_req = apps[idx]
        let rate_req = [...app_req.rating]
        let rate = app_req.rate

        const curr = this.state.email

        var emails = rate_req?.map((obj) => obj.email)
        console.log("HHOO",app_req)

        if(emails !== undefined && emails.includes(curr)){
            var value = prompt("Rate Again?(Y/N)")
            if(value == 'Y'){
                value = prompt("Rate between(0,5)") - '0'
                if([0,1,2,3,4,5].includes(value)){
                    for(var i in rate_req){
                        if(rate_req[i].email == curr){
                            rate_req[i].value = value 
                        }
                    }
                    
                    const newObj = {
                        job_id : this.state.apps[idx].job_id,
                        rating : rate_req,
                        rate : this.rateCalc(rate_req)
                    }
                    axios.post("http://localhost:5000/editRating/job",newObj)
                         .then(response =>{
                            apps[idx].rating = rate_req
                            apps[idx].rate = newObj.rate
                            this.setState({apps})
                        })
                }
                else alert("Invalid Value!!")
            }
        }
        else{
            var value = prompt("Rate between(0,5)") - '0'
            if([0,1,2,3,4,5].includes(value)){
                rate_req.push({email : curr, value : value})

                const newObj = {
                    job_id : this.state.apps[idx].job_id,
                    rating : rate_req,
                    rate : this.rateCalc(rate_req)
                }
                axios.post("http://localhost:5000/editRating/job",newObj)
                     .then(response =>{
                        console.log("HAHAJHAJA")
                        apps[idx].rating = rate_req
                        apps[idx].rate = newObj.rate
                        this.setState({apps})
                    })
            }
            else alert("Invalid Value!!")
        }
        
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
                <Table striped bordered hover  responsive="lg">
                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Date of Joining</th>
                        <th>Salary</th>
                        <th>Recruiter</th>
                        <th>Application Status</th>
                        <th>Job status</th>
                        <th>Rating of Job</th>
                        <th>Select</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.apps.map((app,idx) =>{

                    return(
                        <tr>
                            <td>{this.state.apps[idx].title}</td>
                            <td>{moment(this.state.apps[idx].join).format("DD/MM/YY")}</td>
                            <td>{this.state.apps[idx].salary}</td>
                            <td>{this.state.apps[idx].recruiter}</td>
                            

                            {this.state.apps[idx].status === 'Applied' && <td><Button variant="outline-info" value="edit">Applied</Button></td> }
                            {this.state.apps[idx].status === 'Shortlisted' && <td><Button variant="outline-warning" value="edit">Shortlisted</Button></td> }
                            {this.state.apps[idx].status === 'Accepted' && <td><Button variant="outline-success" value="edit">Accepted</Button></td> }
                            {this.state.apps[idx].status === 'Rejected' && <td><Button variant="outline-danger" value="edit">Rejected</Button></td> }


                            <td>{this.state.apps[idx].job_status}</td>
                            <td>{this.state.apps[idx].rate}</td>
                            {this.state.apps[idx].status === 'Accepted' &&<td><Button variant="warning" className="btn btn-primary" value="edit" onClick={()=>this.edit(idx)}>Rate Job</Button></td>}
                            {this.state.apps[idx].status !== 'Accepted' &&<td><Button variant="warning" className="btn btn-primary" value="edit" disabled>Rate Job</Button></td>}
                            

                        </tr>
                    )
                })}
                </tbody>
                </Table>
            </div>
        )
    }
}

