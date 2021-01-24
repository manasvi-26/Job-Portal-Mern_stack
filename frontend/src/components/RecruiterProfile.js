import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Box from '@material-ui/core/Box';
import axios from "axios";
import Form from "react-bootstrap/Form";
import FormControl from 'react-bootstrap/FormControl'
import { Button, FormGroup, ControlLabel } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";

export default class RecruiterProfile extends Component {

    state ={
        username:"",
        email:"",
        bio:"",
        phone :""
    }

    componentDidMount(){
        const newUser = {
            email: localStorage.getItem("email"),
            type: localStorage.getItem("type")
        };
        if (newUser.type !== "Recruiter") this.props.history.push("/");

        this.setState({ email: newUser.email });

        axios
            .post("http://localhost:5000/user", newUser)
            .then(response => {
                this.setState({ username: response.data.username });
                this.setState({ phone: response.data.phone });
                this.setState({ bio: response.data.bio });
                console.log("BIO should be ",response.data.bio)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    bioChange = e => {
        this.setState({ bio: e.target.value })
    }
    nameChange = e => {
        this.setState({ username: e.target.value })
    }
    phoneChange = e => {
        this.setState({ phone: e.target.value })
    }

    Validation(newUser)
    {
        var phone = newUser.phone
        //Pattern:
        var pattern = "/^\d{10}$/";
        if(phone && !(/^\d{10}$/.test(phone))){
            alert("Enter Valid phone number");
            console.log(phone.match(/^\d{10}$/))
            console.log(phone)
            return false;
        }

        const username = newUser.username

        if(!username){
            alert("Username field cant be empty!!");
            return false
        }

        return true;
    }

    submit = e=>{


        const newUser={
            username :this.state.username,
            email : this.state.email,
            phone : this.state.phone,
            bio : this.state.bio
        }

        var val = this.Validation(newUser)
        if(val){

            axios
            .post("http://localhost:5000/recruiter/editProfile", newUser)
            .then(response =>{
                    alert("Changes saved!!")
                    this.setState({ username: response.data.username, phone : response.data.phone, bio:response.data.bio  });
            })
            .catch(function (error) {
                console.log(error);
            });
    
            localStorage.setItem("username", this.state.username);

        }
        else{
            console.log("jajaj")
            axios
            .post("http://localhost:5000/user", {email : this.state.email})
            .then(response => {
                this.setState({ username: response.data.username });
                this.setState({ phone: response.data.phone });
                this.setState({ bio: response.data.bio });

                console.log(this.state.phone)
            })
            .catch(function (error) {
                console.log(error);
            });

        }
    }

    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Nav className="mr-auto">
                    <Link to="/RecruiterProfile" className="navbar-brand">My Profile</Link>
                        <li className="navbar-item">
                            <Link to="/RecruiterHome" className="nav-link">Home</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/CreateJob" className="nav-link">Create Job</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/ActiveJobs" className="nav-link">Job Listings</Link>
                        </li>
                    </Nav>
                    <Link to="/" className="nav-link">Logout</Link>
                </Navbar>
                <br /><br /><br />
                <div style={{ textAlign: "center" }}><h1>My Profile</h1></div><br></br><br></br>

                <Form>
                <Row>
                    <Col>
                    <Form.Label>Username</Form.Label>
                    <Form inline>
                        <Form.Control type="text" value={this.state.username} className="mr-sm-2" onChange={this.nameChange} />
                        <Button variant="info" onClick ={this.submit}>Edit</Button>
                    </Form>
                    </Col>
                    <Col>
                    <Form.Label>PhoneNumber</Form.Label>
                    <Form inline>
                        <Form.Control type="text" value={this.state.phone} className="mr-sm-2" onChange={this.phoneChange} />
                        <Button variant="info"  onClick ={this.submit}>Edit</Button>
                    </Form>
                    </Col>
                    <Col>
                    <Form.Label>Email Id</Form.Label>
                    <Form inline>
                        <Form.Control type="text" value={this.state.email} className="mr-sm-2"  />
                    </Form>
                    </Col>
                </Row>
                </Form>
                <br></br><br></br>
                <div style={{width:"400px" ,margin:"0 auto"}}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control as="textarea" defaultValue={this.state.bio} onChange={this.bioChange}rows={10} />
                        <Button variant="info"  onClick ={this.submit}>Edit</Button>
                    </Form.Group>
                </div>
               
            </div>
        )
    }
}