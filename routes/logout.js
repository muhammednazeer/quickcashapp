const logoutdRoute = require('express').Router();

logoutdRoute.get('/logout',  (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
   
});


module.exports = logoutdRoute;
