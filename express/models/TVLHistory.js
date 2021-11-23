const { string } = require('joi');
const mongoose = require('mongoose');

const TVLHistorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    usd: {
        type: Number,
        require: true
    },
    btc: {
        type: Number,
        require: true
    },
    eth: {
        type: Number,
        require: true
    },
    dai: {
        type: Number,
        require: true
    },
    timestamp: {
        type: Number,
        require: true
    }
});

module.exports = mongoose.model('TVLHistory', TVLHistorySchema);