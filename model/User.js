const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firsName: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    lastName: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    pasword: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    }
});

module.exports = mongoose.model('User', userSchema);