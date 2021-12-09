const router = require('express').Router();
const User = require('../models/User');

router.get('/allusers', async (req, res) => {
    try{
        const all = await User.find();
        res.send(all);
    }catch(err){
        res.send({message:err})
    }
});

module.exports = router 
