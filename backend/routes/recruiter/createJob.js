const router = require('express').Router();
const Job = require('../../models/Job');

router.post('/',(req,res) =>{

    const NewJob = new Job({

        email : req.body.email,
        username : req.body.username,
        title : req.body.title,
        applicants : req.body.applicants,
        positions : req.body.positions,
        type : req.body.type,
        duration : req.body.duration,
        salary : req.body.salary,
        deadline : req.body.deadline,
        skills : req.body.skills
    })

    NewJob.save()
          .then(job => {return res.status(200).json(job)})
    
})

module.exports = router;
