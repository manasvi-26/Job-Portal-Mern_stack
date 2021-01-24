const router = require('express').Router();

const User = require('../../models/User');

//Edit user data:

router.post('/',(req,res) =>{ 

    User.findOne({email : req.body.email},function(err,user){
        if(err)console.log(err)
        else{

            console.log("given data")
            console.log(req.body)
            if(req.body.bio)user.bio = req.body.bio;
            if(req.body.username) user.username = req.body.username;
            if(req.body.phone)user.phone = req.body.phone;

            user.save()
                .then(user =>{
                    res.json(user)
                    console.log(user)
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    })
       
})

module.exports = router;