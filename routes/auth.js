const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jtoken = require('jsonwebtoken');

// validation 
const Joi = require('@hapi/joi');
// Register validation
const registerSchema = Joi.object ({
    id: Joi.string().min(16).max(16).required(),
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    tel: Joi.string().min(11).max(11).required(),
    password: Joi.string().min(4).max(4).required()
});
// Login validation
const loginSchema = Joi.object ({
    id: Joi.string().min(16).max(16).required(),
    password: Joi.string().min(4).max(4).required()
});

// register
router.post('/register', async (req, res) => {
    // validate data before user creation 
    const { error } = registerSchema.validate(req.body);
    // error in response
    if (error) res.send(error.details[0].message);

    // check if email exists
    const emailExist = await User.findOne({ email: req.body.email });
    if(emailExist) return res.status(400).send("email is in use");
     // check if tel exists
    const telExist = await User.findOne({ tel: req.body.tel });
    if(telExist) return res.status(400).send("tel is in use");
    // check if id exists
    const idExist = await User.findOne({ id: req.body.id });
    if(idExist) return res.status(400).send(`your already registerd ${req.body.name} `);

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const user = new User ({
        id: req.body.id, 
        name: req.body.name,
        email: req.body.email,
        tel: req.body.tel,
        password: hashPassword
    });
    try {
        const savedUser = await user.save()
        res.send(savedUser);
    } catch(err) {
        res.status(400).send(err);
    }
});

// logout
router.get('/logout', (req, res) => {
    res.header('auth-token', '').send('logged out, goodbye')
});

// Login 
router.post('/login', async (req, res) => {
    // validate data before user login
    const { error } = loginSchema.validate(req.body);
    // error in response
    if (error) res.send(error.details[0].message);

    // check if id exists
    const user = await User.findOne({ id: req.body.id });
    if(!user) return res.status(400).send(`this id isn't registerd, sign up now`);
    // check password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send(`password incorrect`);

    // jsonwebtoken creation/assign
    const token = jtoken.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '30min'});
    res.header('auth-token', token).send(`Welcome back, ${user.name}`);
});

module.exports = router 
