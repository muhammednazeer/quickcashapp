const createUserRoute = require('express').Router();
const User = require('../model/User');
const { registerValidation } = require('../middleware/validation');
const bcrypt = require('bcryptjs');


//Registration Route
createUserRoute.post('/register', async (req, res) => {

    //Validate before creating a User
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
        
    //Checking if the user already exist
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    // //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPasword = await bcrypt.hash(req.body.password, salt)

    //Create a new User
    //|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    const initialTrasaction = 1000;
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPasword,
        account: {
            usd: initialTrasaction,
            eur: 0,
            ngn: 0
        },
        transactions: [{

            from: 'initial transaction',

            to: req.body.firstName,

            value: initialTrasaction,

            currency: 'USD'

        }]
    });

    try {
        await user.save();
        res.redirect('/');
    } catch (error) {
        console.error('abort transaction');


    }
});


module.exports = createUserRoute;
