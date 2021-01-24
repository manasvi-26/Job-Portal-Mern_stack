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

export default class ApplicantProfile extends Component {

        state = {
            username : "",
            skills :[],
            email : "",
            education:[{}]
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
                this.setState({ education: response.data.education });
                this.setState({ rating: response.data.rating });
                this.setState({ skills: response.data.skills });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
     
     

    edit = e =>{

        const newUser={
            username :this.state.username,
            email : this.state.email,
            skills : this.state.skills,
            education : this.state.education
        }


        axios
        .post("http://localhost:5000/applicant/editProfile", newUser)
        .then(response =>{
                alert("Changes saved!!")
                this.setState({ username: response.data.username, skills : response.data.skills, education:response.data.education  });
        })
        .catch(function (error) {
            console.log(error);
        });

        localStorage.setItem("username", this.state.username);


    }

    onchange = e =>{
        this.setState({username: e.target.value})
    }
//***********************************************SKILLS FUNCTIONS****************************************************************************************************************/}

    skillChange = (e,idx)=>{

        console.log("TARGET VALUE IS",e.target.value)
        
        const Newskill = [...this.state.skills]
        
        console.log("BEFORE UPDATING",Newskill)
        Newskill[idx] = e.target.value;
        console.log("AFTER UPDATING",Newskill)
        this.setState({skills : Newskill})
    }

    removeSpecificSkill = (idx) => () => {
        const Newskill = [...this.state.skills]
        Newskill.splice(idx, 1)
        this.setState({ skills : Newskill })
    }

    deleteRow = e =>{
            this.setState({
                skills : this.state.skills.slice(0,-1)
            });
    }

    addRow=e =>{

            const newItem = "";
            this.setState({skills : [...this.state.skills,newItem]})
    }

//***********************************************EDUCATION FUNCTIONS****************************************************************************************************************/}
    eduChange = (e,idx)=>{

        console.log("value is..",e.target.value)
        console.log("name is ..",e.target.name)
        console.log("start year",e.target.value.startyear)

        const {name , value} = e.target

        const education =[...this.state.education] 
        
        education[idx][name]  = value

        this.setState({education});

        console.log("changing education",this.state.education);
    }

    removeSpecificEdu = (idx) => () => {
        const Newedu = [...this.state.education]
        Newedu.splice(idx, 1)
        this.setState({ education : Newedu })
    }

    deleteRow1 = e =>{
            this.setState({
                education : this.state.education.slice(0,-1)
            });
    }

    addRow1 =e =>{

            const newItem = {institute: "",startyear: "", endyear:"" }
            this.setState({education : [...this.state.education,newItem]})
    }

//***********************************************DISPLAY****************************************************************************************************************/}

    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Nav className="mr-auto">
                        <Link to="/ApplicantProfile" className="navbar-brand">Profile</Link>
                        <li className="navbar-item">
                            <Link to="/ApplicantHome" className="nav-link">Home</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/MyApps" className="nav-link">My Applications</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/SearchJob" className="nav-link">Search Job</Link>
                        </li>
                    </Nav>

                    <Link to="/" className="nav-link">Logout</Link>
                </Navbar>
                <br /><br /><br /><br />


{/*****************************************USERNAME & EMAIL*************************************************************************/}


                <Form.Label><h3>User Name</h3></Form.Label>
                <Form inline>
                <RB.FormControl  type="text" onChange = {this.onchange} defaultValue={this.state.username}/>
                <Button variant="info" className="btn btn-primary" value="edit" onClick={this.edit}>Edit Username</Button>
                </Form>
                <br/><br></br>
                <Form.Label><h3>Email address</h3></Form.Label>
                <Form inline>
                <RB.FormControl  type="text" label="email" defaultValue={this.state.email}/>
                </Form>

                <br></br><br></br>

{/***********************************************SKILLS****************************************************************************************************************/}
                <form onSubmit = {this.edit}>
                <table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th><h3>Skills</h3></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <hr></hr>
                    <tbody>
                        {this.state.skills.map((skill,idx) =>{
                            return (
                                <tr>
                                    <td><input type="text" defaultValue={this.state.skills[idx]} onChange ={(e)=> {this.skillChange(e,idx)}}  /></td>
                                    <td><Button variant="warning" className="btn btn-primary" value="edit" onClick={this.edit}>Edit Skill</Button></td>
                                    <td><Button  variant ="danger" className="btn btn-primary" value="edit" onClick={this.removeSpecificSkill(idx)}>Delete Skill</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <br></br>
                <button onClick={this.addRow} className="btn btn-primary">Add Row</button>
                <button onClick={this.deleteRow} className="btn btn-danger">Delete Last Row </button>
                <br/><br/>

                <Button variant="warning" className="btn btn-primary" value="edit" onClick={this.edit}>SAVE CHANGES</Button>
                        
                </form>
                <br></br><br></br>
                
{/***********************************************EDUCATION****************************************************************************************************************/}
                <form onSubmit = {this.edit}>
                <table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th><h3>Education</h3></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <hr></hr>
                    <tbody>
                        {this.state.education.map((item,idx) =>{
                            return (
                                <tr>
                                    <td><input type="text" name="institute" defaultValue={this.state.education[idx].institute} onChange ={(e)=> {this.eduChange(e,idx)}}  /></td>
                                    <td><input type="text" name="startyear" defaultValue={this.state.education[idx].startyear} onChange ={(e)=> {this.eduChange(e,idx)}}  /></td>
                                    <td><input type="text" name="endyear" defaultValue={this.state.education[idx].endyear} onChange ={(e)=> {this.eduChange(e,idx)}}  /></td>
                                    <td><Button variant="warning" className="btn btn-primary" value="edit" onClick={this.edit}>Edit Education Field</Button></td>
                                    <td><Button  variant ="danger" className="btn btn-primary" value="edit" onClick={this.removeSpecificEdu(idx)}>Delete Education Field</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <br></br>
                <button onClick={this.addRow1} className="btn btn-primary">Add Row</button>
                <button onClick={this.deleteRow1} className="btn btn-danger">Delete Last Row </button>
                <br/><br/>

                <Button variant="warning" className="btn btn-primary" value="edit" onClick={this.edit}>SAVE CHANGES</Button>
                        
                </form>
                
            </div>
        )
    }
}

