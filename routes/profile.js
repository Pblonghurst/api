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

// patches
// updates name
router.patch('/profile', verify, async (req, res) => {
    try{
        const updatedName = await User.updateOne( 
                { $set: {name: req.body.name} }
            );
        res.send(updatedName);
    }catch(err){
        res.send({message:err})
    }
});
// updates email
router.patch('/profile', verify, async (req, res) => {
    try{
        const updatedEmail = await User.updateOne( 
                { $set: {name: req.body.name} }
            );
        res.send(updatedEmail);
    }catch(err){
        res.send({message:err})
    }
});
// updates tel
router.patch('/profile', verify, async (req, res) => {
    try{
        const updatedTel = await User.updateOne( 
                { $set: {name: req.body.name} }
            );
        res.send(updatedTel);
    }catch(err){
        res.send({message:err})
    }
});

// be careful with this 
// updates Pass
router.patch('/profile', verify, async (req, res) => {
    try{
        const updatedPass = await User.updateOne( 
                { $set: {name: req.body.name} }
            );
        res.send(updatedPass);
    }catch(err){
        res.send({message:err})
    }
});
// updates Wallet
router.patch('/profile', verify, async (req, res) => {
    try{
        const updatedWallet = await User.updateOne( 
                { $set: {name: req.body.name} }
            );
        res.send(updatedWallet);
    }catch(err){
        res.send({message:err})
    }
});

module.exports = router 
 