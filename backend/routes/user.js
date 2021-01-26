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

router.post('/picture',(req,res) =>{ 
    console.log("in")
    User.findOne({email : req.body.email},function(err,user){
        user.picture = req.body.b64
        user.save()
            .then(user =>{
                console.log(user)
                res.json(user)
            })
            .catch(function (error) {
                console.log(error);
            })
    })
       
})


module.exports = router;


