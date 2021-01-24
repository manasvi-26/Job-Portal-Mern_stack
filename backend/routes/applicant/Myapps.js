const router = require('express').Router();

const Job =  require('../../models/Job');
const Application =  require('../../models/Application');
const User =  require('../../models/User');


router.post('/',(req,res) =>{ 

    Application.find({email_applicant : req.body.email},function(err,apps){
        const job_ids = apps.map(app => app.job_id)

        Job.find({_id : {"$in" : job_ids}},function(err,jobs){
                var arr =[]
                apps.map((app) =>{
                    jobs.map((job) =>{
                        if(app.job_id == job._id){
                            
                            const obj=  {
                                title : job.title,
                                join : app.join,
                                job_status : job.state,
                                status: app.status,
                                _id : app._id,
                                rec_email : job.email,
                                recruiter : job.username,
                                job_id : app.job_id,
                                salary : job.salary
                            }
                            arr.push(obj)
                            return obj
                        }
                    })
                })

                return res.json(arr)
        })
    })
})

module.exports = router;