const router = require('express').Router();
const User = require('../models/User');
const verify = require('./verify');

// sends an array of the user
router.get('/profile', verify, async (req, res) => {
    try{
        const userInfo = await User.findOne();
        res.send(userInfo);
    }catch(err){
        res.send({message:err})
    }
});

module.exports = router 
 