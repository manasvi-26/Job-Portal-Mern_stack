const router = require('express').Router();

const Job =  require('../../models/Job');

router.post('/',(req,res) =>{ 

    console.group(req.body.email)

    Job.find({email : req.body.email, state : "Active"},function(err,jobs){
        if(err)console.log(err)
        else{
            return res.json(jobs)
        }
    })
})

module.exports = router;
