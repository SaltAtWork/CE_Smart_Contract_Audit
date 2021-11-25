const express = require('express');
require('dotenv/config');
const router = express.Router();

//-------------------------------------------------------------//

const Project = require('../models/Project');

//-------------------------------------------------------------//

const validate = require('../validate');

//-------------------------------------------------------------//

const pulse = require('../defiPulse');

//-------------------------------------------------------------//

router.get('/', async(req, res) => {
    try {
        const projectsDB = await Project.find();
        res.send(projectsDB);
    } catch (err) {
        res.send({ message: err });
    }
});

router.get('/:name', async(req, res) => {
    try {
        const projectsDB = await Project.find({ name: req.params.name });
        if (!projectsDB) return res.status(404).send('project id not found');
        res.send(projectsDB);
    } catch (err) {
        res.send({ message: err });
    }
});

router.get('/projects/up', async(req, res) => {
    const data = await pulse.getProject();
    for (var i = 0; i < data.length; i++) {
        try {
            var projectsDB = await Project.find({ name: data[i].name });
            if (!projectsDB) continue;
            var updatedProject = await Project.updateOne({ name: data[i].name }, {
                $set: {
                    usdTVL: data[i].value.tvl.USD.value,
                    ethTVL: data[i].value.tvl.ETH.value,
                    btcTVL: data[i].value.tvl.BTC.value,
                    usdTVLChanged: data[i].value.tvl.USD.relative_1d,
                    ethTVLChanged: data[i].value.tvl.ETH.relative_1d,
                    btcTVLChanged: data[i].value.tvl.BTC.relative_1d,
                    ethLocked: data[i].value.total.ETH.value,
                    btcLocked: data[i].value.total.BTC.value
                }
            });
        } catch (err) {
            res.send({ message: err });
            break;
        }
    }
    res.send('Update Success');
});

router.post('/', async(req, res) => {
    const { error } = validate.project(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const newProject = new Project({
        name: req.body.name,
        description: req.body.description,
        attackHistory: req.body.attackHistory,
        riskAnalysis: req.body.riskAnalysis,
        lastExploited: req.body.lastExploited,
        chain: req.body.chain,
        category: req.body.category,
        usdTVL: req.body.usdTVL,
        ethTVL: req.body.ethTVL,
        btcTVL: req.body.btcTVL,
        usdTVLChanged: req.body.usdTVLChanged,
        ethTVLChanged: req.body.ethTVLChanged,
        btcTVLChanged: req.body.btcTVLChanged,
        ethLocked: req.body.ethLocked,
        btcLocked: req.body.btcLocked
    });

    try {
        const savedProject = await newProject.save();
        res.send(savedProject);
    } catch (err) {
        res.send({ massage: err });
    }
});

router.put('/:name', async(req, res) => {
    const { error } = validate.project(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    try {
        const projectsDB = await Project.find({ name: req.params.name });
        if (!projectsDB) return res.status(404).send('project id not found');
        const updatedProject = await Project.updateOne({ name: req.body.name }, {
            $set: {
                description: req.body.description,
                attackHistory: req.body.attackHistory,
                riskAnalysis: req.body.riskAnalysis,
                lastExploited: req.body.lastExploited,
                chain: req.body.chain,
                category: req.body.category,
                usdTVL: req.body.usdTVL,
                ethTVL: req.body.ethTVL,
                btcTVL: req.body.btcTVL,
                usdTVLChanged: req.body.usdTVLChanged,
                ethTVLChanged: req.body.ethTVLChanged,
                btcTVLChanged: req.body.btcTVLChanged,
                ethLocked: req.body.ethLocked,
                btcLocked: req.body.btcLocked
            }
        });
        res.send(updatedProject);
    } catch (err) {
        res.send({ message: err });
    }
});

router.delete('/:name', async(req, res) => {
    try {
        const removedProject = await Project.deleteOne({ name: req.params.name });
        res.send('delete success');
    } catch (err) {
        res.send({ message: err });
    }
});

//-------------------------------------------------------------//

module.exports = router;