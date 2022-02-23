const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

//Connect to DB

mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => { console.log("Connected to db!"); });
 

//Import Routes

const authRoute = require('./routes/auth');


//Routes Middlewares


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});