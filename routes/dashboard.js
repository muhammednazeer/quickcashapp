const dashboardRoute = require('express').Router();
const User = require('../model/User');

//Registration Route
dashboardRoute.get('/dashboard', async(req, res) => {
    const user = await User.findById(req.session.userId)
    if(!user) return res.redirect('/')
    const { account } = user;
    const { firstName, email } = user;
const {transactions} = user;
   
    res.render('dashboard', {account, transactions, firstName, email});
});

module.exports = dashboardRoute