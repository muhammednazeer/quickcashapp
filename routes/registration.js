const registrationRoute = require('express').Router();

//Registration Route
registrationRoute.get('/register', (req, res) => {
    res.render('register');
});

module.exports = registrationRoute