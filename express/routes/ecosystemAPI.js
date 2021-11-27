const express = require('express');
require('dotenv/config');
const router = express.Router();

//-------------------------------------------------------------//

const Ecosystem = require('../models/Ecosystem');

//-------------------------------------------------------------//

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

//-------------------------------------------------------------//

router.get('/', async(req, res) => {
    try {
        const ecosystemDB = await Ecosystem.find();
        res.send(ecosystemDB);
    } catch (err) {
        res.send({ message: err });
    }
});

router.get('/:name', async(req, res) => {
    try {
        const ecosystemDB = await Ecosystem.find({ name: req.params.name });
        if (isEmpty(ecosystemDB)) return res.status(404).send('Ecosystem is not found');
        res.send(ecosystemDB);
    } catch (err) {
        res.send({ message: err });
    }
});

router.post('/', async(req, res) => {
    const newEcosystem = new Ecosystem({
        name: req.body.name,
        description: req.body.description,
        linkAddress: req.body.linkAddress,
    });
    try {
        const savedEcosystem = await newEcosystem.save();
        res.send(savedEcosystem);
    } catch (err) {
        res.send({ massage: err });
    }
});

router.put('/:name/:description', async(req, res) => {
    try {
        const ecosystemDB = await Ecosystem.find({ name: req.params.name, description: req.params.description });
        if (isEmpty(ecosystemDB)) return res.status(404).send('Ecosystem is not found');
        const updatedEcosystem = await Ecosystem.updateOne({ name: req.body.name }, {
            $set: {
                description: req.body.description,
                linkAddress: req.body.linkAddress,
            }
        });
        res.send(updatedEcosystem);
    } catch (err) {
        res.send({ message: err });
    }
});

router.delete('/:name/:description', async(req, res) => {
    try {
        const removedEcosystem = await Ecosystem.deleteOne({ name: req.params.name, description: req.params.description });
        res.send('delete success');
    } catch (err) {
        res.send({ message: err });
    }
});

//-------------------------------------------------------------//

module.exports = router;