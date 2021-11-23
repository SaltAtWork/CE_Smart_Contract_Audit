const express = require('express');
require('dotenv/config');
const router = express.Router();

//-------------------------------------------------------------//

const Audit = require('../models/Audit');

//-------------------------------------------------------------//

router.get('/', async(req, res) => {
    try {
        const AuditDB = await Audit.find();
        res.send(AuditDB);
    } catch (err) {
        res.send({ message: err });
    }
});

router.get('/:name', async(req, res) => {
    try {
        const AuditDB = await Audit.find({ name: req.params.name });
        if (!AuditDB) return res.status(404).send('Audit is not found');
        res.send(AuditDB);
    } catch (err) {
        res.send({ message: err });
    }
});

router.post('/', async(req, res) => {
    const newAudit = new Audit({
        name: req.body.name,
        description: req.body.description,
        link: req.body.link,
    });
    try {
        const savedAudit = await newAudit.save();
        res.send(savedAudit);
    } catch (err) {
        res.send({ massage: err });
    }
});

router.put('/:name/:description', async(req, res) => {
    try {
        const AuditDB = await Audit.find({ name: req.params.name, description: req.params.description });
        if (!AuditDB) return res.status(404).send('Audit is not found');
        const updatedAudit = await Audit.updateOne({ name: req.body.name }, {
            $set: {
                description: req.body.description,
                link: req.body.link,
            }
        });
        res.send(updatedAudit);
    } catch (err) {
        res.send({ message: err });
    }
});

router.delete('/:name/:description', async(req, res) => {
    try {
        const removedAudit = await Audit.deleteOne({ name: req.params.name, description: req.params.description });
        res.send('delete success');
    } catch (err) {
        res.send({ message: err });
    }
});

//-------------------------------------------------------------//

module.exports = router;