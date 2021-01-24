const router = require('express').Router();

const Job =  require('../../models/Job');
const Application =  require('../../models/Application');
const User =  require('../../models/User');

router.post('/',(req,res) =>{ 

    Application.findOne({_id : req.body._id},function(err,app){
        if(err) console.log(err)
        app.status = "Shortlisted"
        app.save()
            .then(app =>{
                res.json(app)
                console.log(app)
            })
            .catch(function (error) {
                console.log(error);
            })
    })
})

module.exports = router;