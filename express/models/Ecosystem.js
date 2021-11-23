const { string } = require('joi');
const mongoose = require('mongoose');

const EcosystemSchema = mongoose.Schema({
    //project name
    name: {
        type: String,
        require: true
    },
    //actual display text
    description: {
        type: String,
        require: true
    },
    //link to ecosystem
    link: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Ecosystem', EcosystemSchema);