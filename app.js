const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const expressSession = require('express-session');
const mongoStore = require('connect-mongo');

const app = express();
const { config, engine } = require('express-edge');
dotenv.config();
//Connect to DB
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => { console.log("Connected to db!"); });


app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: process.env.DB_CONNECTION
    })
}))

const PORT = process.env.PORT || 5000;

//App middlewares

//set static folder
app.use(express.static('public'));
app.use(engine);
app.set('views', `${__dirname}/views`);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Configure Edge if need to
//config({ cache: process.env.NODE_ENV === 'production' });

const verifyAuth = require('./middleware/verifyauth');




//Import Routes
const authRoute = require('./routes/auth');
const registrationRoute = require('./routes/registration');
const dashboardRoute = require('./routes/dashboard');
const loginRoute = require('./routes/login');
const transactionRoute = require('./routes/transactions');
const newUserRoute = require('./routes/createUser');
const logoutRoute = require('./routes/logout');
//const newTransactionRoute = require('./routes/newTransaction');
const newTransactionRoute = require('./routes/transactionNew');
//Route Middleware

app.use('/', loginRoute); //Login View 
app.use('/user', authRoute); //User Login Middleware
app.use('/', registrationRoute); //Registration View
app.use('/user', newUserRoute); //User Registration Middleware
app.use('/',  dashboardRoute); //Dashboard Route
app.use('/',  transactionRoute); //New Transaction Middleware
app.use('/auth', logoutRoute); //Registration View
//app.use('/transaction', verifyAuth, newTransactionRoute);
app.use('/', newTransactionRoute); //Login View 









// Automatically sets view engine and adds dot notation to app.render




//Routes Middlewares


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});