const transactionRoute = require('express').Router();
const User = require('../model/User');

//New Transaction Route
transactionRoute.get('/transaction', async (req, res) => {
    const receiver = req.body.sender;
    console.log(receiver);
    const allUsers = await User.find({});
    const loginUser = allUsers.filter((user) => {
        return user._id.toString() == req.session.userId;
    });

    const users = allUsers.filter((user) => {
        return user._id.toString() != req.session.userId;
    })


    if (!loginUser) {
        return res.redirect('/');
    }
    const [{ firstName }] = loginUser;
    res.render('transaction', { users, firstName });

});

module.exports = transactionRoute