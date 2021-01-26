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



export default class ApplicantSearchJob extends Component {

    state = {
        username: "",
        email: "",
        jobs: [],
        search: "",
        sort: "",
        order: "",
        show : false,
        sop : "",
        myApps : [],
        curr_job :{
            email : "",
            job_id: ""
        },
        filterJob : "",
        filterDuration : "",
        SalaryMax : "",
        SalaryMin : ""
    }

    componentDidMount() {

        const newUser = {
            email: localStorage.getItem("email"),
            type: localStorage.getItem("type")
        };
        if (newUser.type !== "Applicant") this.props.history.push("/");

        this.setState({ email: newUser.email });

        axios
            .post("http://localhost:5000/user", newUser)
            .then(response => {
                this.setState({ username: response.data.username });

            })
            .catch(function (error) {
                console.log(error);
            });

        axios
            .get("http://localhost:5000/jobslist")
            .then(response => {
                this.setState({ jobs: response.data })
            })
            .catch(function (error) {
                console.log(error);
            });

        axios
            .post("http://localhost:5000/applicant/getAllApplications",newUser)
            .then(response =>{
                this.setState({ myApps: response.data })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    searchChange = e => {
        this.setState({ search: e.target.value })
    }

    sortChange = e => {
        console.log("value is for sort", e.target.value)

        this.setState({ sort: e.target.value })
        console.log(this.state.sort)

    }

    orderChange = e => {
        console.log("value is for order", e.target.value)

        this.setState({ order: e.target.value })
        console.log(this.state.order)
    }

    showModal = (idx)=>()=>{

        var list = this.state.myApps.map((app)=>{return app.status})
        
        var count = 0
        var accept =0
        for(var i=0;i<list.length;i++){
            if(list[i] === 'Applied')count++
            if(list[i] === 'Shortlisted')count++
            if(list[i] === 'Accepted')accept=1
        }

        if(count >= 10){alert("Applied to 10 jobs already !!")}
        else if(accept){alert("Already accepted at a job!!")}
        else{
            this.setState({
                show : !this.state.show
            })
    
            const newJob = {
                email : this.state.jobs[idx].email,
                job_id : this.state.jobs[idx]._id
            }
    
            this.setState({
                curr_job : newJob
            })
        }        
    }

    apply = (sopText,job)=>{
        this.setState({sop : sopText})

        //Checking if i can apply?
        

        //Assuming applicant can apply:
        //need to change data in all 3 databases

        console.log(job.email)
      
        const newApplication = {

            email_applicant : this.state.email,
            email_recruiter : job.email,
            sop :sopText,
            job_id : job.job_id,
            username: this.state.username
        }
        console.log(this.state.username)
        //add application in database
        axios
            .post("http://localhost:5000/applicant/submitApplication",newApplication)
            .then(response=>{
                console.log("great")
            })
            .catch(function (error) {
                console.log(error);
            });
        /*
        //change count of number of applications user has applied
        const obj ={
            email : this.state.email
        }
        axios
            .post("http://localhost:5000/applicant/ApplicationCount",obj)
            .then(response=>{
                console.log("increased count")
            })
            .catch(function (error) {
                console.log(error);
            });

        */

        //change count of applicants in job_id
        const obj2 = {
            job_id : job.job_id
        }
        axios
        .post("http://localhost:5000/recruiter/ApplicationCount",obj2)
        .then(response=>{
            console.log("increased count")
        })
        .catch(function (error) {
            console.log(error);
        });

        alert("Application has been submitted!!")

        this.setState({
            show : !this.state.show
        })

        window.location.reload()
       
    }

    checkButtonType = (job)=>{
        //3 types : apply , full , applied

        //1.check if applied:
        if(job.state == 'Inactive')return "inactive"
        var AppsList = this.state.myApps.map((app)=>{return app.job_id})
        
        if(AppsList.includes(job._id)) return "applied"

        if(job.curr_applicants === job.applicants)return "full"
        return "apply"
    }


    sort = e => {

        const copy = this.state.jobs

        if (this.state.order === "ascending") {
            switch (this.state.sort) {
                case "salary":
                    copy.sort((a, b) => (a.salary > b.salary) ? 1 : -1);
                    break;
                case "duration":
                    copy.sort((a, b) => (a.duration > b.duration) ? 1 : -1);
                    break;
                case "rating":
                    copy.sort((a, b) => (a.rate > b.rate) ? 1 : -1);
                    break;
            }
        }
        else if (this.state.order === "descending") {
            switch (this.state.sort) {
                case "salary":
                    copy.sort((a, b) => (a.salary > b.salary) ? -1 : 1);
                    break;
                case "duration":
                    copy.sort((a, b) => (a.duration > b.duration) ? -1 : 1);
                    break;
                case "rating":
                    copy.sort((a, b) => (a.rate > b.rate) ? -1 : 1);
                    break;
            }
        }

        this.setState({ jobs: copy })
    }

    onchange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    minChange = e =>{
        this.setState({ minSalary: e.target.value })
    }
    maxChange = e =>{
        this.setState({ maxSalary: e.target.value })
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
                            <Link to="/MyApps" className="nav-link">My Applications</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/ApplicantProfile" className="nav-link">Profile</Link>
                        </li>
                    </Nav>

                    <Link to="/" className="nav-link">Logout</Link>
                </Navbar>
                <br /><br /><br /><br />
                <h1 style={{ textAlign: "center" }}>View Job Listings</h1><br /><br/>

                <Form>
                <Row>
                    <Col>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.searchChange} />
                        <Button variant="outline-info">Search</Button>
                    </Form>
                    </Col>
                    <Col>
                    <Form.Label>Sort you Job Searches</Form.Label>

                    <Form inline>
                        <Form.Control as="select" className="mr-sm-2" defaultValue={this.state.sort} onClick={this.sortChange}>
                            <option value="salary">salary</option>
                            <option value="duration">duration</option>
                            <option value="rating">rating</option>

                        </Form.Control>
                        <Form.Control as="select" className="mr-sm-2" defaultValue={this.state.order} onClick={this.orderChange} >
                            <option value="ascending">ascending</option>
                            <option value="descending">descending</option>
                        </Form.Control>
                        <Button style={{ marginRight: 15 }} onClick={this.sort} variant="outline-info">Sort</Button>
                    </Form>
                    </Col>
                </Row>
                </Form>
    
                <br></br><br></br>
                <Form>
                    <Row>
                        <Col>
                        <Form.Label>Filter based on Duration (in months)</Form.Label>
                        <Form.Control as="select" name="filterDuration" defaultValue="" onChange={this.onchange} value={this.state.duration}> 
                            <option></option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                        </Form.Control>
                        </Col>
                        <Col>
                        <Form.Label>Filter based on Job type</Form.Label>
                        <Form.Control as="select" name="filterJob" defaultValue="Full-time" defaultValue="" onChange={this.onchange} value={this.state.type} >
                                <option></option>
                                <option>Full-time</option>
                                <option>Part-time</option>
                                <option>Work from Home</option>
                            </Form.Control>
                        </Col>
                        <Col>
                        <Form.Label>Filter based on Salary</Form.Label>
                        <Form inline>
                            <FormControl type="text" placeholder="Minimum Salary" className="mr-sm-2" onChange={this.minChange} />
                            <FormControl type="text" placeholder="Maximum Salary" className="mr-sm-2" onChange={this.maxChange} />
                           
                        </Form>
                        </Col>
                    </Row>
                </Form>

                <br></br><br></br>

                <Table striped bordered hover  responsive="lg">
                    <thead>
                        <tr>
                            <th>Job Title</th>
                            <th>Recruiter Name</th>
                            <th>Salary</th>
                            <th>Duration(in Months)</th>
                            <th>Job Type</th>
                            <th>Deadline</th>
                            <th>Rating of Job</th>
                            <th>Select</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.jobs.map((job, idx) => {
                            const today = new Date()
                            if (moment(today).isAfter(job.deadline)) {
                                return null;
                            }
                            const { search,filterJob, filterDuration,maxSalary,minSalary } = this.state;
                            if (search !== '' && job.title.toLowerCase().indexOf(search.toLowerCase()) === -1) {
                                return null
                            }

                            if(filterJob !== '' && job.type !== filterJob)return null
                            if(filterDuration !== '' && job.duration >= filterDuration)return null
                            if(maxSalary !== '' && job.salary > maxSalary)return null
                            if(minSalary !== '' && job.salary < minSalary)return null


                            
                            const select = this.checkButtonType(job)


                            return (
                                <tr>
                                    <td>{job.title}</td>
                                    <td>{job.username}</td>
                                    <td>{job.salary}</td>
                                    <td>{job.duration}</td>
                                    <td>{job.type}</td>
                                    <td>{moment(job.deadline).format("DD/MM/YY")}</td>
                                    <td>{job.rate}</td>
                                    {select === 'inactive' && <td><Button variant="dark" className="btn btn-primary" value="edit">INACTIVE JOB</Button></td>}
                                    {select === 'applied' && <td><Button variant="success" className="btn btn-primary" value="edit">Applied</Button></td>}
                                    {select === 'full' &&  <td><Button variant="info" className="btn btn-primary" value="edit">Full</Button></td>}

                                    {select === 'apply' && <td><Button variant="danger" className="btn btn-primary" value="edit" onClick={this.showModal(idx)}>Apply</Button></td>}
                                
                                    <SopModal  show={this.state.show} apply={this.apply.bind(this) }  job={this.state.curr_job}/>    
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>


        )
    }
}