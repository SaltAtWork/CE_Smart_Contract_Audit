const express = require('express');
require('dotenv/config');
const router = express.Router();

//-------------------------------------------------------------//

const TVLHistory = require('../models/TVLHistory');

//-------------------------------------------------------------//

const pulse = require('../defiPulse');

//-------------------------------------------------------------//

router.get('/up/:name/:period', async(req, res) => {
    const data = await pulse.getHistory(req.params.name, req.params.period);
    for (var i = 0; i < data.length; i++) {
        try {
            var historyDB = await TVLHistory.find({ name: req.params.name, timestamp: data[i].timestamp });
            if (!historyDB) {
                console.log('test1');
                var newTVLHistory = new TVLHistory({
                    name: req.body.name,
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
        if (!TVLHistoryDB) return res.status(404).send('TVLHistory is not found');
        res.send(TVLHistoryDB);
    } catch (err) {
        res.send({ message: err });
    }
});

//-------------------------------------------------------------//

module.exports = router;