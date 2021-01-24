const router = require('express').Router();

const User = require('../../models/User');

router.post('/',(req,res) =>{ 

    User.findOne({email : req.body.email},function(err,user){
        if(err)console.log(err)
        else{

            console.log(user.application)
            user.application = user.application+1
            user.save()
                .then(user =>{
                    res.json(user)
                    console.log("application count increased...",user.application)
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    })
})


module.exports = router;