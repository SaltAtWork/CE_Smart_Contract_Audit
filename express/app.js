const express = require('express');
const app = express();
const Joi = require('joi');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

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

const projectAPIRoute = require('./routes/projectAPI');
app.use('/projects', projectAPIRoute);

//-------------------------------------------------------------//

const ecosystemAPIRoute = require('./routes/ecosystemAPI');
app.use('/ecosystems', ecosystemAPIRoute);

//-------------------------------------------------------------//

const auditAPIRoute = require('./routes/auditAPI');
app.use('/audits', auditAPIRoute);

//-------------------------------------------------------------//

const TVLHistoryAPIRoute = require('./routes/TVLHistoryAPI');
app.use('/TVLHistory', TVLHistoryAPIRoute);

//-------------------------------------------------------------//
//port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));

//TODO
// create route for audit and ecosystem
// add last exploited chain %change category
// create tvl history schema
// create tvl history api defi pulse
// create tvl history route