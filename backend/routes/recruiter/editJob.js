const User = require('../../models/User');

const router = require('express').Router();

const Job =  require('../../models/Job');

router.post('/',(req,res) =>{ 

    Job.findOne({_id : req.body._id},function(err,job){
        if(err) console.log(err)

        job.applicants = req.body.applicants,
        job.positions = req.body.positions,
        job.deadline = req.body.deadline 

        job.save()
            .then(job =>{
                console.log(job)
                res.json(job)
            })
            .catch(function (error) {
                console.log(error);
            })
    })

})

module.exports = router;