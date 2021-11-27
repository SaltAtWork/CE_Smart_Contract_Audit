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
    console.log("Got the data");
    for (var i = 0; i < data.length; i++) {
        try {
            var historyDB = await TVLHistory.find({ name: req.params.name, timestamp: data[i].timestamp });
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

module.exports = router;