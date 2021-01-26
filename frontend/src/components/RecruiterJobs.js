import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Box from '@material-ui/core/Box';
import axios from "axios";
import DropdownButton from 'react-bootstrap/DropdownButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'


import moment from 'moment'


export default class RecruiterJobs extends Component {

    state = {
        jobs : [],
        email : ""
    }

    componentDidMount(){

        const newUser = {
            email: localStorage.getItem("email"),
            type: localStorage.getItem("type")
        };
        if (newUser.type !== "Recruiter") this.props.history.push("/");
        this.setState({ email: newUser.email });
        axios
            .post("http://localhost:5000/recruiter/getActiveJobs",newUser)
            .then(response => {
                this.setState({ jobs: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });

        console.log(this.state.jobs)
        
    }

    deadline = (idx)=>{

        var value = prompt('Enter New Deadline')
        if(!isNaN(value) && value){
            const jobs = [...this.state.jobs]
            jobs[idx].deadline = value
            const obj = jobs[idx]
            axios
                .post("http://localhost:5000/recruiter/editJob",obj)
                .then(response => {
                    this.setState({jobs :jobs});
                    alert("Changes Saved :)")
                })
                .catch(function (error) {
                    console.log(error);
                });
            
        }
        else alert("Invalid value")
    }
    applicants = (idx)=>{

        var value = prompt('Enter Value for Max applicants')
        if(!isNaN(value) && value){
            
            const jobs = [...this.state.jobs]
            if(jobs[idx].curr_applicants > value){
                alert("Cant change value to less than current number of applicants")
            }
            else if(value === '0') alert("Cant change value to 0 ")
            else{
                jobs[idx].applicants = value
                const obj = jobs[idx]
                axios
                    .post("http://localhost:5000/recruiter/editJob",obj)
                    .then(response => {
                        this.setState({jobs :jobs});
                        alert("Changes Saved :)")
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
        else alert("Invalid value")
    }

    positions = (idx)=>{

        var value = prompt('Enter Value for Max positions')
        
        if(!isNaN(value) && value){    
            const jobs = [...this.state.jobs]
            if(jobs[idx].curr_positions > value){
                alert("Cant change value to less than current number of positions")
            }
            else if(value === '0') alert("Cant change value to 0 ")
            else{
                jobs[idx].positions = value
                const obj = jobs[idx]
                axios
                    .post("http://localhost:5000/recruiter/editJob",obj)
                    .then(response => {
                        this.setState({jobs :jobs});
                        alert("Changes Saved :)")
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
        else alert("Invalid value")
    }

 
    delete = (idx) => () => {
        console.log(idx)
        const newJobs = [...this.state.jobs]
        const obj = newJobs[idx]

        console.log("this job should be deleted ",obj)

        axios
        .post("http://localhost:5000/recruiter/deleteJob",obj)
        .then(response => {
            newJobs.splice(idx, 1)
            console.log(newJobs)
            this.setState({ jobs: newJobs })
            alert("Job deleted")
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    view = (idx) =>() =>{
        localStorage.setItem("job_id",this.state.jobs[idx]._id)
        this.props.history.push("/RecruiterViewApps");
    }

    render() {
    return (
      <div>
       <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
                <Link to="/ActiveJobs" className="navbar-brand">Job Listings</Link>
                <li className="navbar-item">
                    <Link to="/RecruiterHome" className="nav-link">Home</Link>
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
        <h1 style={{ textAlign: "center" }}>View Job Listings</h1><br /><br/>


        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Job Title</th>
                    <th>Posted Date</th>
                    <th>Deadline</th>
                    <th>Max Applicants</th>
                    <th>Max Positions</th>
                    <th>Remaining Positions</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>View Applications</th>
                </tr>
            </thead>
            <tbody>
                {this.state.jobs.map((job,idx) =>{
                    return(
                        <tr>
                        <td>{this.state.jobs[idx].title}</td>
                        <td>{moment(this.state.jobs[idx].date).format("DD/MM/YY")}</td>
                        <td>{moment(this.state.jobs[idx].deadline).format("DD/MM/YY")}</td>
                        <td>{this.state.jobs[idx].applicants}</td>
                        <td>{this.state.jobs[idx].positions}</td>
                        <td>{this.state.jobs[idx].positions - this.state.jobs[idx].curr_positions}</td>

                        <td>
                        <DropdownButton variant="warning" as={ButtonGroup} title="Edit">
                        <Dropdown.Item>
                            <div  onClick={()=>{this.deadline(idx);}}>Deadline</div>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <div  onClick={()=>{this.applicants(idx);}}>Max Applicants</div>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <div  onClick={()=>{this.positions(idx);}}>Max Positions</div>
                        </Dropdown.Item>
                       
                        </DropdownButton>
                        </td>
                        <td><Button  variant ="danger" className="btn btn-primary" value="delete" onClick={this.delete(idx)}>Delete Job</Button></td>
                        <td><Button  variant ="info" className="btn btn-primary" value="view" onClick={this.view(idx)}>View Applications</Button></td>
                        
                        </tr>
                    )
                })}
            </tbody>
        </Table>

      </div>

    );
  }
}
