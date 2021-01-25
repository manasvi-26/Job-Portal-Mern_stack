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


export default class RecruiterEmployees extends Component {

    state ={
        emps : [],
        email: "",
        username : ""
    }

    componentDidMount(){

        const newUser = {
            email: localStorage.getItem("email"),
            type: localStorage.getItem("type")
        };
        if (newUser.type !== "Recruiter") this.props.history.push("/");
        this.setState({ email: newUser.email });
        
        axios
        .post("http://localhost:5000/recruiter/employee",newUser)    
        .then(
            response =>{
                this.setState({emps : response.data})

                var arr = this.state.emps.map((emp) => emp.rating)
                this.setState({ratings : arr})
               
            }
        )
    }

    calcRating = (rate_req) =>{
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

    edit = (idx) =>{
        let emps = [...this.state.emps]
        let emp_req = emps[idx]
        let rate_req = [...emp_req.rating]

        //so required ratings is in rate_req
       
        const curr = this.state.email

        var emails = rate_req?.map((obj) => obj.email)
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
                        email : this.state.emps[idx].email,
                        ratings : rate_req,
                        rate : this.calcRating(rate_req)
                    }
                    axios.post("http://localhost:5000/editRating",newObj)
                         .then(response =>{
                            emps[idx].rating = rate_req
                            emps[idx].rate = newObj.rate
                            this.setState({emps})
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
                    email : this.state.emps[idx].email,
                    ratings : rate_req,
                    rate : this.calcRating(rate_req)
                }
                axios.post("http://localhost:5000/editRating",newObj)
                     .then(response =>{
                         console.log("HAHAJHAJA")
                        emps[idx].rating = rate_req
                        emps[idx].rate = newObj.rate
                        this.setState({emps})
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
                    <Link to="/Employees" className="navbar-brand">My Employees</Link>
                    <li className="navbar-item">
                        <Link to="/RecruiterHome" className="nav-link">Home</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/ActiveJobs" className="nav-link">Job Listings</Link>
                    </li>     
                    <li className="navbar-item">
                        <Link to="/CreateJob" className="nav-link">Create Job</Link>
                    </li>   
                    <li className="navbar-item">
                        <Link to="/RecruiterProfile" className="nav-link">My Profile</Link>
                    </li>      
                    </Nav>
                    <Link to="/" className="nav-link">Logout</Link> 
                </Navbar>   
                <br></br><br></br><br></br>  
                <h1 style={{ textAlign: "center" }}>View My Employees</h1><br />
                <br></br><br></br>
                <Table striped bordered hover  responsive="lg">
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Date of Joining</th>
                            <th>Job Type</th>
                            <th>Job Title</th>
                            <th>Rating</th>
                            <th>Select</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.emps.map((emp,idx) =>{
                            

                            return(
                                <tr>
                                    <td>{this.state.emps[idx].username}</td>
                                    <td>{this.state.emps[idx].join}</td>
                                    <td>{this.state.emps[idx].job_type}</td>
                                    <td>{this.state.emps[idx].title}</td>
                                    <td>{this.state.emps[idx].rate}</td>
                                    <td><Button variant="warning" className="btn btn-primary" value="edit" onClick={()=>this.edit(idx)}>Rate Employee</Button></td>
                                </tr>
                            )

                        })}

                    </tbody>
                    </Table>
            </div>
  
        )
    }
}