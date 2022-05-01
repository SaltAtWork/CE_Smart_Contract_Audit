const express = require('express');
require('dotenv/config');
const router = express.Router();

//-------------------------------------------------------------//

const TVLHistory = require('../models/TVLHistory');

//-------------------------------------------------------------//

const pulse = require('../defiPulse');

//-------------------------------------------------------------//

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

//-------------------------------------------------------------//

router.get('/up/:name/:period', async(req, res) => {
    console.log("Requesting the data");
    const data = await pulse.getHistory(req.params.name, req.params.period);
    console.log("recieved the response");
    for (var i = 0; i < data.length; i++) {
        console.log(i);
        try {
            var historyDB = await TVLHistory.find({ name: req.params.name, timestamp: data[i].timestamp });
            console.log('found name');
            if (isEmpty(historyDB)) {
                var newTVLHistory = new TVLHistory({
                    name: req.params.name,
                    usd: data[i].tvlUSD,
                    btc: data[i].BTC,
                    eth: data[i].ETH,
                    dai: data[i].DAI,
                    timestamp: data[i].timestamp,
                });
                var savedTVLHistory = await newTVLHistory.save();
            } else continue;
        } catch (err) {
            res.send({ message: err });
            break;
        }
    }
    res.send('Update Success');
});

router.get('/history/:name', async(req, res) => {
    try {
        const TVLHistoryDB = await TVLHistory.find({ name: req.params.name });
        if (isEmpty(TVLHistoryDB)) return res.status(404).send('TVLHistory is not found');
        res.send(TVLHistoryDB);
    } catch (err) {
        res.send({ message: err });
    }
});

//-------------------------------------------------------------//

router.get('/manual/:name/', async(req, res) => {
    console.log('manual update');
    fileName = '../temp_tvl/' + req.params.name + '.json'
    const jsonData = require(fileName);
    for (var i = 0; i < jsonData.length; i++) {
        try {
            var historyDB = await TVLHistory.find({ name: req.params.name, timestamp: jsonData[i].timestamp });
            if (isEmpty(historyDB)) {
                var newTVLHistory = new TVLHistory({
                    name: req.params.name,
                    usd: jsonData[i].tvlUSD,
                    btc: jsonData[i].BTC,
                    eth: jsonData[i].ETH,
                    dai: jsonData[i].DAI,
                    timestamp: jsonData[i].timestamp,
                });
                var savedTVLHistory = await newTVLHistory.save();
            } else continue;
        } catch (err) {
            res.send({ message: err });
            break;
        }
    }
    res.send('Update Success');
});

//-------------------------------------------------------------//

module.exports = router;