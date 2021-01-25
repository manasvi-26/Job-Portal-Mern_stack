const router = require('express').Router();

const Job =  require('../../models/Job');
const Application =  require('../../models/Application');
const User =  require('../../models/User');


router.post('/',(req,res) =>{ 

    console.log(req.body)

    Application.find({ job_id : req.body.job_id, status : {$ne : "Rejected"}},function(err,apps){

        if(err) console.log(err)
        else{
            if(!apps.length){
                console.log("no applications");
                res.json(apps)
            }
            else{
                var arr = []
               
                for (const idx in apps){
                    
                    User.findOne({email : apps[idx].email_applicant}, function(err,user){
                        if(err) console.log(err)

                        
                        const obj = {
                            email : user.email,
                            sop : apps[idx].sop,
                            date : apps[idx].date,
                            status: apps[idx].status,
                            _id : apps[idx]._id,
                            username : user.username,
                            job_id : apps[idx].job_id,
                            education : user.education,
                            skills : user.skills
                        }
                     
                        arr.push(obj)
                        if(idx == (apps.length-1))return res.json(arr)
                    })

                }
            }
        }

    })

})

module.exports = router;