import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import RecruiterHome from './components/RecruiterHome'
import ApplicantHome from './components/ApplicantHome'
import ApplicantProfile from './components/ApplicantProfile'

import CreateJob from'./components/RecruiterCreateJob'
import ApplicantSearchJob from'./components/ApplicantSearchJob'
import { AccordionSummary } from '@material-ui/core';
import RecruiterJobs from './components/RecruiterJobs';
import RecruiterViewApps from './components/RecruiterViewApps';
import ApplicantMyApps from'./components/ApplicantMyApps'
import RecruiterProfile from'./components/RecruiterProfile'
import RecruiterEmployees from'./components/RecruiterEmployees'

function App() {
  return (
    <Router>
      <div className="container">
        <br/>
        <Route path="/" exact component={Home}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route path="/RecruiterHome" component={RecruiterHome}/>
        <Route path="/ApplicantHome" component={ApplicantHome}/>
        <Route path="/ApplicantProfile" component={ApplicantProfile}/>
        <Route path="/CreateJob" component={CreateJob}/>
        <Route path="/SearchJob" component={ApplicantSearchJob}/>
        <Route path="/ActiveJobs" component={RecruiterJobs}/>
        <Route path="/RecruiterViewApps" component={RecruiterViewApps}/>
        <Route path="/MyApps" component={ApplicantMyApps}/>
        <Route path="/RecruiterProfile" component={RecruiterProfile}/>
        <Route path="/Employees" component={RecruiterEmployees}/>
      </div>
    </Router>
  );
}


export default App;
