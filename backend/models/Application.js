const mongoose = require('mongoose');

const Schema = mongoose.Schema
const ApplicationSchema = new Schema({

    email_applicant :{
        type : String,
        required : true
    },
    email_recruiter :{
        type : String,
        required : true
    },
    status : {
        type : String,
        default : "Applied"
    },
    sop : {
        type : String
    },
    date :{
        type : Date,
        default : Date.now
    },
    job_id :{
        type : String,
        required: true
    },
    join :{
        type : Date
    },
    username :{
        type : String,
        required : true
    }

})

module.exports = Application = mongoose.model('Application', ApplicationSchema);
