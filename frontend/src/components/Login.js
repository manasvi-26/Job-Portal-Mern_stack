import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import axios from'axios'

export default class Register extends Component {

  constructor(props){
    super(props)

    this.state = {
      email :"",
      password :""
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit = (e) =>{
    e.preventDefault()

    const newUser = {
        email: this.state.email,
        password: this.state.password
    }
    const{email, password} = newUser;


    axios.post("http://localhost:5000/login", newUser).then(res => {
      
      if(!res.data.user)alert(res.data.msg)
      else{
        localStorage.setItem("email", res.data.user.email);
        localStorage.setItem("type", res.data.user.type);
        localStorage.setItem("username", res.data.user.username);


        if(res.data.user.type === "Applicant") this.props.history.push("/ApplicantHome");
        else this.props.history.push("/RecruiterHome");
        
      }         
    });

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
                <Link to="/login" className="navbar-brand">Login</Link>
                <li className="navbar-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li> 
                <li className="navbar-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
            </Nav>
        </Navbar>

        <br/><br/><br/><br/>

        <form align="center" onSubmit = {this.handleSubmit}>
          <label><h1>LOGIN</h1></label><br/>

          <div className="form-group">
            <label>Enter Email:</label>
            <br/>
            <input type='text' name='email'value = {this.state.email}  onChange={this.onInputChange}/>
          </div>
          <div className="form-group">
            <label>Enter Password:</label>
            <br/>
            <input type='text' name='password' value = {this.state.password}  onChange={this.onInputChange}/>
          </div>
          <br/><br/><br/>
          <button>SUBMIT</button>
        </form>
      </div>
    );
  }
}
