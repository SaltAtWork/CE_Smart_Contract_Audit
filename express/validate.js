const Joi = require('joi');

function project(project) {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        attackHistory: Joi.string().required(),
        riskAnalysis: Joi.string().required(),
        lastExploited: Joi.string().required(),
        chain: Joi.string().required(),
        category: Joi.string().required(),
        usdTVL: Joi.number().min(0).precision(9).required(),
        ethTVL: Joi.number().min(0).precision(9).required(),
        btcTVL: Joi.number().min(0).precision(9).required(),
        usdTVLChanged: Joi.number().min(0).precision(9).required(),
        ethTVLChanged: Joi.number().min(0).precision(9).required(),
        btcTVLChanged: Joi.number().min(0).precision(9).required(),
        ethLocked: Joi.number().min(0).precision(9).required(),
        btcLocked: Joi.number().min(0).precision(9).required()
    });
    return schema.validate(project);
};

module.exports = {
    project
};