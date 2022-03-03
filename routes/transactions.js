const transactionRoute = require('express').Router();
const User = require('../model/User');

//New Transaction Route
transactionRoute.get('/transaction', async (req, res) => {
    const allUsers = await User.find({});
    const loginUser = req.session.firstName;
    const email = req.session.email;

    const users = allUsers.filter((user) => {
        return user._id.toString() != req.session.userId;
    })


    if (!loginUser) {
        return res.redirect('/');
    }
    console.log(req.session.firstName);
    //const [{ firstName }] = loginUser;
    res.render('transaction', { users, loginUser, email });

});

module.exports = transactionRoute