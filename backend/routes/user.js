const router = require('express').Router();


const User = require('../models/User');

//Get user data :
router.post('/',(req,res) =>{ 
    console.log("in")
    User.findOne({email : req.body.email},function(err,user){
        if(err)console.log(err)
        else res.json(user)
    })
       
})

module.exports = router;


