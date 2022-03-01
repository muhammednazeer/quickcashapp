const loginRoute = require('express').Router();

//Registration Route
loginRoute.get('/', (req, res) => {
   
        
    res.render('index');
});

module.exports = loginRoute