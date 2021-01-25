const router = require('express').Router();

const Job =  require('../../models/Job');
const Application =  require('../../models/Application');
const User =  require('../../models/User');


router.post('/',async(req,res) =>{ 

    var filter = {email_applicant : req.body.email}
    const apps =  await Application.find(filter)
    const job_ids =  apps.map(app => app.job_id)
    const jobs = await Job.find({_id : {"$in" : job_ids}})
    const user_emails = apps.map(app => app.email_recruiter)
    const users = await User.find({email : {"$in" : user_emails}})


    var arr = []
    apps.map((app,idx) =>{
        jobs.map((job)=>{
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
                return obj;
            }
        })
        users.map((user) =>{
            if(app.email_recruiter == user.email){
                arr[idx].rating = user.rating
                arr[idx].rate = user.rate 
                return;
            }
        })

    })
    console.log("this should be printed",arr);
    return res.json(arr)
})

module.exports = router;