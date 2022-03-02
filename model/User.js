const mongoose = require('mongoose');
const moment = require('moment');

const userSchema = mongoose.Schema({
    firstName: {
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
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    account: {
        usd: {
            type: Number,
            min: 0,
            required: true
        },
        eur: {
            type: Number,
            min: 0,
            required: true
        },
        ngn: {
            type: Number,
            min: 0,
            required: true
        },

    },
    transactions:([{
        createdAt: {
            type: Date,
            default: moment().utc().format('Y-M-D H:M:S')
        },
        updatedAt: {
            type: Date,
            default: moment().utc().format('Y-M-D H:M:S')
        },
        transactionId: {
            type: Number,
            default: 0

        },
        from: {
            type: String,
            required: true,
        },
        to: {
            type: String,
            required: true,
        },
        value: {
            type: Number,
            required: true,
            min: 1,
        },
        currency: {
            type: String,
            required: true,
        }

    }])
});

module.exports = mongoose.model('User', userSchema);