const authRoute = require('express').Router();
const User = require('../model/User');
const { loginValidation } = require('../middleware/validation');
const bcrypt = require('bcryptjs');

//Login Route
authRoute.post('/login', async (req, res) => {
    
    //Validate before login  User
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if the email exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email is Incorrect');
    

    //PASSWORD IS CORRECT
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Password is Incorrect');

    //Create a session token
    req.session.userId = user._id
    req.session.firstName = user.firstName
    req.session.email = user.email
    res.redirect('/dashboard');

});

module.exports = authRoute;