const router = require('express').Router();
const User = require('../models/User');

router.post('/',(req,res) =>{
    console.log("GIVEN RATINGS ",req.body)
    User.findOne({email : req.body.email},function(err,user){

        if(err)console.log(err)
        else{
            user.rating = req.body.ratings
            user.rate = req.body.rate
            user.save()
                .then(user=>{
                    res.json(user)
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    })
    
})

module.exports = router;