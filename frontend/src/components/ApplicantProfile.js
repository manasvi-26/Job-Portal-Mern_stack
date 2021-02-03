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
import { Col, Row } from "react-bootstrap";
import Resizer from 'react-image-file-resizer';

export default class ApplicantProfile extends Component {

        state = {
            username : "",
            skills :[],
            email : "",
            education:[],
            rate : "",
            picture : "",
            b64 : ""
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
                this.setState({ rate: response.data.rate });
                this.setState({ skills: response.data.skills });
                this.setState({ b64: response.data.picture });

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    check(newUser){

        //Checking Username:
        if(newUser.username == ''){
            alert("Username cant be empty!!")
            return false
        }

        const education = newUser.education
        for(var i in education){
            if(education[i].institute == ''){
                alert("Institute Name cant be empty!!")
                return false
            }
            if(education[i].startyear == ''){
                alert("Start yearcant be empty!!")
                return false
            }
            if(education[i].endyear !== ''){
                if(education[i].startyear > education[i].endyear){
                    alert("Start Year cant be after End Year in Education Field!")
                    return false
                }
            }
        } 
        const skills = newUser.skills
        for(var i in skills){
            if(skills[i] == ''){
                alert("Skill field cant be empty!!")
                return false

            }

        }
        const endyear = newUser.endyear
        const startyear = newUser.startyear

        console.log(endyear)
        console.log(startyear)


       
        return true
    }

    edit = e =>{

        const newUser={
            username :this.state.username,
            email : this.state.email,
            skills : this.state.skills,
            education : this.state.education
        }

        var val = this.check(newUser)
        if(val == true){

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

    addRow=e =>{

            const newItem = "";
            this.setState({skills : [...this.state.skills,newItem]})
    }

//***********************************************EDUCATION FUNCTIONS****************************************************************************************************************/}
    eduChange = (e,idx)=>{

        console.log("value is..",e.target.value)
        console.log("name is ..",e.target.name)

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


    addRow1 =e =>{

            const newItem = {institute: "",startyear: "", endyear:"" }
            this.setState({education : [...this.state.education,newItem]})
    }
//***********************************************PICTURE CHANGE****************************************************************************************************************/}

    pictureChange = e =>{
        console.log(e.target.files[0])
        this.setState({picture : e.target.files[0]})
    }

    fileUpload = async(e) =>{
        if(this.state.picture === ""){alert("No file has been Chosen!!")
            return
        }
        const b64 = await this.resizeFile(this.state.picture)
        console.log(b64)

        const newUser={
            email : this.state.email,
            b64 : b64
        }

        axios
            .post("http://localhost:5000/user/picture", newUser)
            .then(response =>{
                    alert("Changes saved!!")
                    this.setState({ b64 : response.data.picture });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    resizeFile = (file) => {
        return new Promise(resolve => {
            Resizer.imageFileResizer(file , 250 , 250 , 'JPEG' , 100 , 0 , uri => {
                resolve(uri);
            } , 
            'base64'
            );
        })
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
                <div style={{ textAlign: "center" }}><h1>My Profile</h1></div><br></br><br></br>



{/*****************************************USERNAME & EMAIL*************************************************************************/}


                <Form>
                    
                    <Row>
                    <div style={{width:"400px" ,margin:"0 auto"}}>
                        <Form.Label><h3>Profile Picture</h3></Form.Label>
                        <Form inline>
                        {this.state.b64 !== '' ? (<img src={this.state.b64}/>)  : (<textarea  rows="10" cols="20"></textarea>)}
                        <RB.FormControl type="file" onChange ={this.pictureChange} defaultValue = {this.state.picture}/>
                        <Button variant="info" className="btn btn-primary" value="edit" onClick={this.fileUpload}>Upload Picture</Button>
                        </Form>
                    </div>
                    </Row>
                    <br></br><br></br><br></br>
                    
                    <Row>
                        <Col>
                        <Form.Label><h3>User Name</h3></Form.Label>
                        <Form inline>
                        <RB.FormControl  type="text" onChange = {this.onchange} defaultValue={this.state.username}/>
                       
                        <Button variant="info" className="btn btn-primary" value="edit" onClick={this.edit}>Edit Username</Button>
                        </Form>
                        </Col>
                        <Col>
                        <Form.Label><h3>Email address</h3></Form.Label>
                        <Form inline>
                        <RB.FormControl  type="text" label="email" readonly="readonly" defaultValue={this.state.email}/>
                        </Form>
                        </Col>
                        <Col>
                        <Form.Label><h3>Rating</h3></Form.Label>
                        <Form inline>
                        
                        <RB.FormControl  type="text" label="rating" readonly="readonly" defaultValue={this.state.rate}/>
                        </Form>
                        </Col>
                    </Row>
                </Form>
                <br></br><br></br><br></br>

{/***********************************************SKILLS****************************************************************************************************************/}
               
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
                                    <td><Form.Control type="text" defaultValue={this.state.skills[idx]} onChange ={(e)=> {this.skillChange(e,idx)} }placeholder="skill name"  /></td>
                                    <td><Button  variant ="danger" className="btn btn-primary" value="edit" onClick={this.removeSpecificSkill(idx)}>Delete Skill</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <br></br>
               
                <button onClick={this.addRow} className="btn btn-primary">Add Row</button>
                
                <br></br><br></br><br></br>
                
{/***********************************************EDUCATION****************************************************************************************************************/}
                <h3>Education</h3><br></br>
                <table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Institute Name</th>
                            <th>Start Year</th>
                            <th>End Year</th>
                        </tr>
                    </thead>
                    <hr></hr>
                    <tbody>
                        {this.state.education.map((item,idx) =>{
                            return (
                                <tr>
                                    <td><Form.Control type="text" name="institute" defaultValue={this.state.education[idx].institute} onChange ={(e)=> {this.eduChange(e,idx)}} placeholder="institute name"  /></td>
                                    <td> <Form.Control type="date" name="startyear" defaultValue={this.state.education[idx].startyear} onChange ={(e)=> {this.eduChange(e,idx)}}  /></td>
                                    <td> <Form.Control type="date" name="endyear" defaultValue={this.state.education[idx].endyear} onChange ={(e)=> {this.eduChange(e,idx)}}  /></td>
                                    
                                    
                                    <td><Button  variant ="danger" className="btn btn-primary" value="edit" onClick={this.removeSpecificEdu(idx)}>Delete Education Field</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <br></br>
                <button onClick={this.addRow1} className="btn btn-primary">Add Row</button>
                <br></br><br></br>
                <div style={{width:"500px" ,margin:"0 auto"}}>
                <Button variant="warning" className="btn btn-primary" value="edit" onClick={this.edit} size="lg">SAVE CHANGES</Button>

                </div>

                <br/><br/>
       
            </div>
        )
    }
}

