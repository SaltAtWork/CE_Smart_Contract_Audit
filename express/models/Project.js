const { string } = require('joi');
const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    attackHistory: {
        type: String,
        require: true
    },
    riskAnalysis: {
        type: String,
        require: true
    },
    lastExploited: {
        type: String,
        require: true
    },
    chain: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    usdTVL: {
        type: Number,
        require: true
    },
    ethTVL: {
        type: Number,
        require: true
    },
    btcTVL: {
        type: Number,
        require: true
    },
    usdTVLChanged: {
        type: Number,
        require: true
    },
    ethTVLChanged: {
        type: Number,
        require: true
    },
    btcTVLChanged: {
        type: Number,
        require: true
    },
    ethLocked: {
        type: Number,
        require: true
    },
    btcLocked: {
        type: Number,
        require: true
    }
});

module.exports = mongoose.model('Project', ProjectSchema);