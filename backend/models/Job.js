const mongoose = require('mongoose');

const Schema = mongoose.Schema
const JobSchema = new Schema({
    email :{
        type : String,
        required :true
    },
    username:{
        type : String,
        required : true
    },
    title:{
        type : String,
        required :true
    },
    applicants:{
        type : Number,
        required :true
    },
    positions:{
        type : Number,
        required :true
    },
    curr_applicants :{
        type : Number,
        default :0
    },
    curr_positions :{
        type : Number,
        default :0
    },
    date :{
        type : Date,
        default : Date.now
    },
    type:{
        type : String,
        required : true
    },
    duration:{
        type : Number,
        required :true
    },
    salary:{
        type : Number,
        required :true
    },
    rating :{
      type : [{
        email : String,
        value : {
          type : Number
        } 
      }]
    },
    rate :{
        type : Number,
        default : 0
    },
    state:{
        type : String,
        default : "Active"
    },
    deadline :{
        type : Date,
        required : true
    },
    skills :{
        type : String,
        required : true
    } 
})

module.exports = Job = mongoose.model('Job', JobSchema);
