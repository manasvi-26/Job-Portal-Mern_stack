const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require('config');
//Set up:

const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

// Setup Port:
const PORT = 5000;
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}!!`));


//Make connection


const db = config.get('MongoURI');
mongoose.connect(db,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected!!"))
.catch(err => console.log(err))


//Routes :

const register = require('./routes/register');
const login = require('./routes/login');
const userData = require('./routes/user');
const getjobs = require('./routes/jobs');
const rating = require('./routes/ratings');

//applicant:
const editUserData = require('./routes/applicant/editProfile');
const submitApplication = require('./routes/applicant/submitApplication');
const getAllApplications = require('./routes/applicant/getAllApplications');
const MyApps = require('./routes/applicant/Myapps');

//recruiter:
const createJob = require('./routes/recruiter/createJob');
const getActiveJobs = require('./routes/recruiter/getActiveJobs');
const viewApps = require('./routes/recruiter/ViewApps');
const ApplicationCount =  require('./routes/recruiter/applicationCount');
const editJob = require('./routes/recruiter/editJob')
const deleteJob = require('./routes/recruiter/deleteJob')
const editProfile = require('./routes/recruiter/editProfile');
const employee = require('./routes/recruiter/employee')





const reject = require('./routes/applications/reject');
const accept = require('./routes/applications/accept');
const shortlist = require('./routes/applications/shortlist');

//API end points:

app.use('/register',register);
app.use('/login',login);
app.use('/user',userData);
app.use('/jobslist',getjobs)
app.use('/editRating',rating)


app.use('/applicant/editProfile',editUserData);
app.use('/applicant/submitApplication',submitApplication);
app.use('/applicant/getAllApplications',getAllApplications );
app.use('/applicant/MyApps',MyApps);

app.use('/recruiter/getActiveJobs',getActiveJobs);
app.use('/recruiter/viewApps',viewApps);
app.use('/recruiter/createJob',createJob);
app.use('/recruiter/ApplicationCount',ApplicationCount );
app.use('/recruiter/editJob',editJob)
app.use('/recruiter/deleteJob',deleteJob)
app.use('/recruiter/editProfile',editProfile);
app.use('/recruiter/employee',employee);





app.use('/application/reject',reject);
app.use('/application/accept',accept);
app.use('/application/shortlist',shortlist);






