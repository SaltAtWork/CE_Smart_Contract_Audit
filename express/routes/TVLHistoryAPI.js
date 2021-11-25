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
    console.log("check point1");
    const data = await pulse.getHistory(req.params.name, req.params.period);
    console.log("check point2");
    for (var i = 0; i < data.length; i++) {
        try {
            var historyDB = await TVLHistory.find({ name: req.params.name, timestamp: data[i].timestamp });
            console.log("check point3");
            if (isEmpty(historyDB)) {
                console.log("check point4");
                var newTVLHistory = new TVLHistory({
                    name: req.body.name,
                    usd: data[i].tvlUSD,
                    btc: data[i].BTC,
                    eth: data[i].ETH,
                    dai: data[i].DAI,
                    timestamp: data[i].timestamp,
                });
                var savedTVLHistory = await newTVLHistory.save();
                console.log("check point5");
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