const { string } = require('joi');
const mongoose = require('mongoose');

const AuditSchema = mongoose.Schema({
    // maker
    name: {
        type: String,
        require: true
    },
    // facebook
    description: {
        type: String,
        require: true
    },
    // w/w.facebook.com
    linkAddress: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Audit', AuditSchema);