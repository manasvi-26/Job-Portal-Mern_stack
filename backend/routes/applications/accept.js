const router = require('express').Router();

const Job =  require('../../models/Job');
const Application =  require('../../models/Application');
const User =  require('../../models/User');

router.post('/',(req,res) =>{ 

    console.log("GIVEN ACCEPT APP DATA..",req.body)

    //reject all other applications made by the applicant

    var curr_job = req.body.job_id 

    var filter = {email_applicant : req.body.email, job_id :{$ne : req.body.job_id}}
    Application.find(filter,function(err,applications){

        const jobs = applications.map(app => app.job_id)
        console.log("JOBS SHOULD BE",jobs)
        //reduce count 
        Job.updateMany({_id : {"$in" : jobs}},{$inc : {curr_applicants :-1}},function(err,response){
            if(err)console.log(err)
           
        })

        const apps = applications.map(app => app._id)

        Application.updateMany({"_id" : {"$in" : apps }},{$set : {status : "Rejected"}},function(err,response){
            if(err)console.log(err)
        })
    })

    Application.findOne({_id : req.body._id},function(err,app){
        if(err) console.log(err)
        app.status = "Accepted"
        app.join = req.body.join

        app.save()
            .then(app =>{
                console.log(app)
            })
            .catch(function (error) {
                console.log(error);
            })
    })


    Job.findOne({_id : req.body.job_id},function(err,job){

        var val = false
        
        if(err)console.log(err)
        job.curr_positions = job.curr_positions + 1

        if(job.curr_positions != job.positions ){
            job.save()
                .then(job =>{
                    console.log("PLEASE PRINT THISSSS",job)
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        
        if(job.curr_positions == job.positions ){
            job.state = "Inactive"   
            job.save()
            .then(job =>{
                console.log("PLEASE PRINT THISSSS",job)
            })
            .catch(function (error) {
                console.log(error);
            })


            //reject all other applications:
            val = true

            filter = {job_id : req.body.job_id, status : {$ne : "Accepted"}}
            var newValue = {$set : {status : "Rejected"}}
            
            Application.updateMany(filter,newValue,function(err,response){
                if(err)console.log(err)
                else{
                    console.log("shutup mehul")
                }
            })
        }

        console.log("response value is..",val)
        if(val == true)res.send("1")
        else res.send("2")

    })
})

module.exports = router;