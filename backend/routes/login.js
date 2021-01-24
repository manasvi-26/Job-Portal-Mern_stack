const router = require('express').Router();
const bcrypt = require('bcryptjs');


const User = require('../models/User');

router.post('/',(req,res) =>{

    const {email,password} = req.body;
    if (!email || !password){
        return res.status(200).send({msg : "Please Enter all the fields!!"});
    }

    User.findOne({email})
        .then(user =>{
            if(!user)return res.status(200).send({ msg: "User not registered" });

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err)return res.status(400).send(err);
                if(isMatch)return res.status(200).send({ msg: "Registered!!",user : user });
                else return res.status(200).send({ msg: "Incorrect Password" });
                
            })
        })
})

module.exports = router;