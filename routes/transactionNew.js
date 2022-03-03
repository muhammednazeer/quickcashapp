const transactionNewRoute = require('express').Router();
const User = require('../model/User');
const currencyConversion = require('../util/currencyConversion');

//Registration Route
transactionNewRoute.post('/new', async (req, res) => {
    const { sender, receiver, source_currency, destination_currency, amount } = req.body;

    const [usd, eur, ngn] = ['USD', 'EUR', 'NGN']; //Currency Symbols

    let convert = currencyConversion(source_currency, destination_currency, amount);
    const converted = convert.toFixed(2)
    console.log(converted);
    

    const Sender = await User.findOne({ firstName: sender }, 'account transactions');
    const Receiver = await User.findOne({ firstName: receiver }, 'account transactions');

   //Users acounts balance
    const senderUSDBal = Sender.account.usd;
    const senderEURBal = Sender.account.eur;
    const senderNGNBal = Sender.account.ngn;
    const receiverUSDBal = Receiver.account.usd;
    const receiverEURBal = Receiver.account.eur;
    const receiverNGNBal = Receiver.account.ngn;

    
    //Curerency transfer
    if (source_currency == usd && destination_currency == ngn && senderUSDBal >= amount) {
        let transferAmount = converted;
        let Senderbalance = senderUSDBal - amount;
        let receiverBalance = receiverNGNBal + transferAmount;
        try {
            await User.findOneAndUpdate({ firstName: sender }, {
                '$set': { 'account.usd': Senderbalance },
                '$push': { 'transactions': { from: 'You', to: receiver, value: transferAmount, currency: destination_currency } }
            });

            await User.findOneAndUpdate({ firstName: receiver }, {
                '$set': { 'account.ngn': receiverBalance },
                '$push': { 'transactions': { from: sender, to: 'You', value: transferAmount, currency: destination_currency } }
            });


        } catch (error) {
            console.log(Error);
        }
        console.log(`Can't perform the operation`);
    }
    else if (source_currency == ngn && destination_currency == usd && senderNGNBal >= amount) {
        let transferAmount = converted;
        let Senderbalance = senderNGNBal - amount;
        let receiverBalance = receiverUSDBal + transferAmount;
        try {
            await User.findOneAndUpdate({ firstName: sender }, {
                '$set': { 'account.ngn': Senderbalance },
                '$push': { 'transactions': { from: 'You', to: receiver, value: transferAmount, currency: destination_currency } }
            });

            await User.findOneAndUpdate({ firstName: receiver }, {
                '$set': { 'account.usd': receiverBalance },
                '$push': { 'transactions': { from: sender, to: 'You', value: transferAmount, currency: destination_currency } }
            });


        } catch (error) {
            console.log(Error);
        }
        console.log(`Can't perform the operation`);
    }
    else if (source_currency == ngn && destination_currency == eur && senderNGNBal >= amount) {
        let transferAmount = converted;
        let Senderbalance = senderNGNBal - amount;
        let receiverBalance = receiverEURBal + transferAmount;
        try {
            await User.findOneAndUpdate({ firstName: sender }, {
                '$set': { 'account.ngn': Senderbalance },
                '$push': { 'transactions': { from: 'You', to: receiver, value: transferAmount, currency: destination_currency } }
            });

            await User.findOneAndUpdate({ firstName: receiver }, {
                '$set': { 'account.eur': receiverBalance },
                '$push': { 'transactions': { from: sender, to: 'You', value: transferAmount, currency: destination_currency } }
            });


        } catch (error) {
            console.log(Error);
        }
        console.log(`Can't perform the operation`);
    }
    else if (source_currency == eur && destination_currency == ngn && senderNGNBal >= amount) {
        let transferAmount = converted;
        let Senderbalance = senderNGNBal - amount;
        let receiverBalance = receiverEURBal + transferAmount;
        try {
            await User.findOneAndUpdate({ firstName: sender }, {
                '$set': { 'account.eur': Senderbalance },
                '$push': { 'transactions': { from: 'You', to: receiver, value: transferAmount, currency: destination_currency } }
            });

            await User.findOneAndUpdate({ firstName: receiver }, {
                '$set': { 'account.ngn': receiverBalance },
                '$push': { 'transactions': { from: sender, to: 'You', value: transferAmount, currency: destination_currency } }
            });


        } catch (error) {
            console.log(Error);
        }
        console.log(`Can't perform the operation`);
    }
    else if (source_currency == usd && destination_currency == eur && senderUSDBal >= amount) {
        let transferAmount = converted;
        let Senderbalance = senderUSDBal - amount;
        let receiverBalance = receiverEURBal + transferAmount;
        try {
            await User.findOneAndUpdate({ firstName: sender }, {
                '$set': { 'account.usd': Senderbalance },
                '$push': { 'transactions': { from: 'You', to: receiver, value: transferAmount, currency: destination_currency } }
            });

            await User.findOneAndUpdate({ firstName: receiver }, {
                '$set': { 'account.eur': receiverBalance },
                '$push': { 'transactions': { from: sender, to: 'You', value: transferAmount, currency: destination_currency } }
            });


        } catch (error) {
            console.log(Error);
        }
        console.log(`Can't perform the operation`);
    }
    else if (source_currency == eur && destination_currency == usd && senderUSDBal >= amount) {
        let transferAmount = converted;
        let Senderbalance = senderEURBal - amount;
        let receiverBalance = receiverUSDBal + transferAmount;
        try {
            await User.findOneAndUpdate({ firstName: sender }, {
                '$set': { 'account.eur': Senderbalance },
                '$push': { 'transactions': { from: 'You', to: receiver, value: transferAmount, currency: destination_currency } }
            });

            await User.findOneAndUpdate({ firstName: receiver }, {
                '$set': { 'account.usd': receiverBalance },
                '$push': { 'transactions': { from: sender, to: 'You', value: transferAmount, currency: destination_currency } }
            });


        } catch (error) {
            console.log(Error);
        }
        console.log(`Can't perform the operation`);
    } else {
      return  res.redirect('/transaction');
    }


    res.redirect('/dashboard');

});


module.exports = transactionNewRoute;

