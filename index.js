const express = require('express');
const app = express();
const mongoose = require('mongoose')
const PORT = 8080;
const cors = require('cors');

// dotenv
const dotenv = require("dotenv");
dotenv.config();

// connect to database 
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log('connected to database')
)

// middleware
app.use( express.json() );
app.use( cors() );

// import routes 
const authRoute = require('./routes/auth');
const accRoute = require('./routes/profile');
const userRoute = require('./routes/allusers');

// route middleware 
app.use('/api/user', authRoute); 
app.use('/api/user', accRoute);
app.use('/api/user', userRoute);

// server start
app.listen(
    PORT, () => console.log('its live')
)

