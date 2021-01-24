const User = require('../../models/User');

const router = require('express').Router();

const Job =  require('../../models/Job');

router.post('/',(req,res) =>{ 

    Job.findOne({_id : req.body.job_id},function(err,job){
        if(err)console.log(err)
        else{
            job.curr_applicants = job.curr_applicants + 1
            job.save()
                .then(job =>{
                    res.json(job)
                    console.log("application count increased...",job.curr_applicants)
                })
                .catch(function (error) {
                    console.log(error);
            })
        }
    })
})

module.exports = router;
