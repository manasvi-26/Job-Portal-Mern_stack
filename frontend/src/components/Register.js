import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import axios from 'axios'

export default class Register extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: "",
            email:"",
            passwrod:"",
            type:"Applicant"
        }

        this.onInputChange = this.onInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit = (e) =>{
        e.preventDefault()

        const newUser = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            type: this.state.type
        }

        const{username, email, password,type} = newUser;

        if (!username || !email || !password || !type){
            alert("Enter all the fields!")
        }
        else{
            axios.post("http://localhost:5000/register", newUser).then(res => {
                if (res.data === 1) alert("This username has already been taken");    
                else  alert("Registration done:)")
            
            });
        }

        //reset fields:
        
        this.setState({
            username: "",
            email: "",
            password: "",
            fullname: "",
            type: "Applicant"
        });

    }
    onInputChange = (e) =>{

        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() {
        return (
        <div>
        <Navbar bg="dark" variant="dark">
                <Nav className="mr-auto">
                    <Link to="/register" className="navbar-brand">Register</Link>
                    <li className="navbar-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li> 
                    <li className="navbar-item">
                        <Link to="/login" className="nav-link">Login</Link>
                    </li>
                </Nav>
            </Navbar>
            <br/><br/><br/><br/>

            <form align="center" onSubmit = {this.handleSubmit}>
                <label><h1>REGISTER</h1></label><br/>
                <div className="form-group">
                    <label>Enter Username:</label>
                    <br/>
                    <input type='text' name='username' value = {this.state.username} onChange={this.onInputChange}/>
                </div>
                <div className="form-group">
                    <label>Enter Password:</label>
                    <br/>
                    <input type='text' name='password' value = {this.state.password}  onChange={this.onInputChange}/>
                </div>
                <div className="form-group">
                    <label>Enter Email:</label>
                    <br/>
                    <input type='text' name='email'value = {this.state.email}  onChange={this.onInputChange}/>
                </div>
                <div className="form-group">
                    <label>Select User Type:</label>
                    <br/>
                    <select name="type" value = {this.state.type} onChange={this.onInputChange}>
                        <option value="Applicant">Applicant</option>
                        <option value="Recruiter">Recruiter</option>
                    </select>
                </div>
                
                <br/><br/><br/>
                <button>SUBMIT</button>
            </form>
        </div>
        
    );
  }
}
