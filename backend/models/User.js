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
        startyear : Date,
        endyear: Date
      }],
      default : []
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
    }
});

module.exports = User = mongoose.model('User', UserSchema);