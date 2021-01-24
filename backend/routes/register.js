const router = require('express').Router();
const bcyrpt = require('bcryptjs');

const User = require('../models/User');



router.post('/',(req,res) =>{

    const{username, email, password,type} = req.body;

    User.findOne({email})
        .then(user => {
            if(user)return res.status(200).send("1");;
            bcyrpt.hash(password, 10, (err, hash) =>{

                if(err)return res.status(400).send(err);

                const NewUser = new User({
                    email : email,
                    password : hash,
                    type : type,
                    username : username
                })

                NewUser.save()
                       .then(user => {return res.status(200).json(user)});
            } )
        })
})
 
module.exports = router;
 
