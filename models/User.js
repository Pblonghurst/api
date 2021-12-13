const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({
    id: {
        type: String,
        required: true, 
        min: 16,
        max: 16
    },
    name: {
        type: String,
        required: true, 
        max: 255
    },
    email: {
        type: String,
        required: true, 
        min: 6,
        max: 255
    },
    tel: {
        type: String,
        required: true, 
        max: 11,
        min: 11
    },
    password: {
        type: String,
        required: true, 
        min: 4,
        max: 4
    },
});

module.exports = mongoose.model('User', userSchema);