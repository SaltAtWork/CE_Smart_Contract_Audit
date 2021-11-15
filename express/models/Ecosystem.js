const { string } = require('joi');
const mongoose = require('mongoose');

const EcosystemSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    link: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Ecosystem', EcosystemSchema);