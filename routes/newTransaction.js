const newTransactionRoute = require('express').Router();
const User = require('../model/User');
const CC = require('currency-converter-lt')


//Registration Route
newTransactionRoute.post('/new', async(req, res) => {
    const { sender, receiver, source_currency, destination_currency, amount } = req.body;


    const amt = Number(amount);

    const sentFrom = await User.findOne({ firstName: sender });
    const sentTo = await User.findOne({ firstName: receiver });
    const srcCurrency = source_currency.toLowerCase();
    const dstCurrency = destination_currency.toLowerCase();
    let senderSourceAccount = sentFrom.account.srcCurrency;

    let receiverAccount = sentTo.account.dstCurrency;

    if (senderSourceAccount < amt) {
        
        return res.redirect('transaction', {error: "Inssuficient fund"})
    }

    try {
        let currencyConverter = new CC({ from: source_currency, to: destination_currency, amount: amt })
        //Currency conversion
        const converted = await currencyConverter.convert().then((response) => {
            return response;

        })

        senderSourceAccount -= amt;
        receiverAccount += converted;

        try {
             await User.findOneAndUpdate({ firstName: sender },
                { account: { srcCurrency: senderSourceAccount } });
           
            console.log(dstCurrency);
            console.log(receiverAccount);
            
             await User.findOneAndUpdate({ firstName: receiver },
                { account: {dstCurrency: receiverAccount} });
          
            
        } catch (error) {
            console.log(error);
            
        }




    } catch (error) {
        console.log(error);
    }
   

  
    
   
    
    
    
    res.redirect('/dashboard');
    
});


module.exports = newTransactionRoute;
