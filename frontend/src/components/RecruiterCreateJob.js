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


export default class CreateJob extends Component {

    state = {
        email: "",
        username: "",
        title: "",
        applicants: "",
        positions: "",
        type: "Full-time",
        duration: "1",
        salary: "",
        deadline: "",
        skills: ""
    }

    onchange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    componentDidMount() {
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
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const newJob = {

            email: this.state.email,
            username: this.state.username,
            title: this.state.title,
            applicants: this.state.applicants,
            positions: this.state.positions,
            type: this.state.type,
            duration: this.state.duration,
            salary: this.state.salary,
            deadline: this.state.deadline,
            skills: this.state.skills

        }

        const { username, email, title, applicants, positions, type, duration, salary, deadline, skills } = newJob;

        console.log()
        if (!username || !email || !title || !applicants || !positions || !type || !duration || !salary || !deadline || !skills)
            alert("Enter all the fields!")
        else if (salary - '0' < 0) alert('Salary cant be negative!!')
        else {
            axios.post("http://localhost:5000/recruiter/createJob", newJob).then(res => {
                alert("Created Job")
            });
        }

        this.setState({
            title: "",
            applicants: "",
            positions: "",
            type: "Full-time",
            duration: "1",
            salary: "",
            deadline: "",
            skills: ""
        })
    }

    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Nav className="mr-auto">
                        <Link to="/CreateJob" className="navbar-brand">Create Job</Link>
                        <li className="navbar-item">
                            <Link to="/RecruiterHome" className="nav-link">Home</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/ActiveJobs" className="nav-link">Job Listings</Link>
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
                <br /><br /><br />
                <div style={{ textAlign: "center" }}><h1>Create a New Job</h1></div><br></br><br></br>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" placeholder="Enter title" onChange={this.onchange} value={this.state.title} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Job Type</Form.Label>
                            <Form.Control as="select" name="type" defaultValue="Full-time" defaultValue="" onChange={this.onchange} value={this.state.type} >

                                <option>Full-time</option>
                                <option>Part-time</option>
                                <option>Work from Home</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Duration (in months)</Form.Label>
                            <Form.Control as="select" name="duration" defaultValue="1" onChange={this.onchange} value={this.state.duration}>

                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Max Applicants</Form.Label>
                            <Form.Control type="text" name="applicants" placeholder="Enter max applicants" onChange={this.onchange} value={this.state.applicants} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Max Postions</Form.Label>
                            <Form.Control type="text" name="positions" placeholder="Enter max positions" onChange={this.onchange} value={this.state.positions} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="formGridCity">
                        <Form.Label>Salary (per month)</Form.Label>
                        <Form.Control type="text" name="salary" placeholder="Enter salary" onChange={this.onchange} value={this.state.salary} />
                    </Form.Group>
                    <Form.Group controlId="formGridCity">
                        <Form.Label>Deadline</Form.Label>
                        <Form.Control type="date" name="deadline" placeholder="Enter deadline for application" onChange={this.onchange} value={this.state.deadline} />
                    </Form.Group>
                    <Form.Group controlId="formGridCity">
                        <Form.Label>Skills</Form.Label>
                        <Form.Control type="text" name="skills" placeholder="Enter skills required" onChange={this.onchange} value={this.state.skills} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        CREATE JOB
                    </Button>
                </Form>
            </div>
        )
    }
}