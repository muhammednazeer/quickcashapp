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
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => { console.log("Connected to db!"); });


app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: process.env.DB_CONNECT
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
const newTransactionRoute = require('./routes/newTransaction');
//Route Middleware
app.use('/', registrationRoute); //Registration View
app.use('/', loginRoute); //Login View 
app.use('/',  dashboardRoute); //Dashboard Route
app.use('/dashboard', verifyAuth, transactionRoute); //New Transaction Middleware
app.use('/user', authRoute); //User Login Middleware
app.use('/user', newUserRoute); //User Registration Middleware
app.use('/auth', logoutRoute); //Registration View
app.use('/transaction', newTransactionRoute);









// Automatically sets view engine and adds dot notation to app.render




//Routes Middlewares


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});