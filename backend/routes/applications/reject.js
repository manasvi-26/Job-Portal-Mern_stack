const router = require('express').Router();

const Job =  require('../../models/Job');
const Application =  require('../../models/Application');
const User =  require('../../models/User');

router.post('/',(req,res) =>{ 

    Application.findOne({_id : req.body._id},function(err,app){
        if(err) console.log(err)
        app.status = "Rejected"
        app.save()
            .then(app =>{
                console.log(app)
            })
            .catch(function (error) {
                console.log(error);
            })
    })

    Job.findOne({_id : req.body.job_id},function(err,job){
        if(err) console.log(err)
        job.curr_applicants = job.curr_applicants - 1
        job.save()
            .then(job =>{
                console.log(job)
            })
            .catch(function (error) {
                console.log(error);
            })
    })

    res.json({msg :"done"})
})

module.exports = router;