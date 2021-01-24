const router = require('express').Router();

const Application = require('../../models/Application');

//Get all applications submitted by applicant:
router.post('/',(req,res) =>{ 

    Application.find({email_applicant : req.body.email},function(err,apps){
        if(err)console.log(err)
        else{
            const arr = apps.map(app => {return{job_id : app.job_id, status : app.status}})
            return res.json(arr)
        }
    })
})

module.exports = router;