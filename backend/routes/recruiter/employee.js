const User = require('../../models/User');

const router = require('express').Router();
const Application =  require('../../models/Application');
const Job =  require('../../models/Job');

router.post('/',async(req,res) =>{ 
    
    var filter = {email_recruiter : req.body.email, status : "Accepted"}

    const apps = await Application.find(filter)
    const job_ids = apps.map(app => app.job_id)
    const jobs = await Job.find({_id : {"$in" : job_ids}})
    const user_emails = apps.map(app => app.email_applicant)
    const users = await User.find({email : {"$in" : user_emails}})


    var arr = []
    apps.map((app,idx) =>{
        jobs.map((job)=>{
            if(app.job_id == job._id){
                            
                const obj=  {
                    username: app.username,
                    email : app.email_applicant,
                    join : app.join,
                    job_type : job.type,
                    title : job.title,
                }
                arr.push(obj)
                return obj;
            }
        })
        users.map((user) =>{
            if(app.email_applicant == user.email){
                arr[idx].rating = user.rating
                return;
            }
        })

    })

    return res.json(arr)
})

module.exports = router;