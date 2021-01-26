const mongoose = require('mongoose');
var mongooseTypePhone = require('mongoose-type-phone');

const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
      type: String,
      required: true
    },
    username:{
      type: String,
      required: true
    },
    type:{
      type: String,
      required: true
    },
    education :{
      type : [{
        institute : String,
        startyear : String,
        endyear: String
      }],
      default : []
    },
    rate :{
      type : Number,
      default : 0
    },
    skills :{
      type : [String],
      default : []
    },
    rating :{
      type : [{
        email : String,
        value : {
          type : Number
        } 
      }]
    },
    phone :{
      type : String
    },
    bio :{
      type:String
    },
    picture : {
      type: String,
      default : ""
    }
});

module.exports = User = mongoose.model('User', UserSchema);