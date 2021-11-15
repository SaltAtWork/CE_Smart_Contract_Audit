const express = require('express');
const app = express();
const Joi = require('joi');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

//-------------------------------------------------------------//

const fetchP =
    import ('node-fetch').then(mod => mod.default)
const fetch = (...args) => fetchP.then(fn => fn(...args))

//-------------------------------------------------------------//

app.use(express.json());
app.use(cors());

//-------------------------------------------------------------//

mongoose.connect(
    process.env.DB_connection,
    () => console.log('connected to DB')
);

//-------------------------------------------------------------//

const homeRoute = require('./routes/home');
app.use('/home', homeRoute);

//-------------------------------------------------------------//

const APIRoute = require('./routes/api');
app.use('/api', APIRoute);

//-------------------------------------------------------------//
//port
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening on port ${port}...`));


//TODO
// create route for audit and ecosystem
// FIX API TVLhistory