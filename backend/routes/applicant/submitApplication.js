const router = require('express').Router();

const Application = require('../../models/Application');

router.post('/',(req,res) =>{

    console.log("application data ...")
    console.log(req.body)

    const NewApplication = new Application({

        email_applicant : req.body.email_applicant,
        email_recruiter : req.body.email_recruiter,
        sop :req.body.sop,
        job_id : req.body.job_id,
        username : req.body.username,
       
    })

    NewApplication.save()
          .then(job => {return res.status(200).json(job)})
    
})

module.exports = router;

