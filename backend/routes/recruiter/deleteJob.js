const User = require('../../models/User');

const router = require('express').Router();

const Job =  require('../../models/Job');
const Application =  require('../../models/Application');


router.post('/',(req,res) =>{ 
    
    console.log("I GOT THIS DELETED JOB")

    Job.findOne({_id : req.body._id},function(err,job){
        if(err) console.log(err)

        job.state = "Deleted"
        job.save()
            .then(job =>{
                console.log(job)
            })
            .catch(function (error) {
                console.log(error);
            })
    })

    var filter = {job_id : req.body._id}
    var newValue = {$set : {status : "Deleted"}}

    Application.updateMany(filter,newValue,function(err,res){
        if(err)console.log(err)
        else{
            console.log("yes") 
        }
    })

    return res.json({msg :"done"})
})

module.exports = router;