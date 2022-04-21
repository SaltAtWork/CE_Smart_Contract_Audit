const Joi = require('joi');

function project(project) {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        attackHistory: Joi.string().required(),
        riskAnalysis: Joi.string().required(),
        lastExploited: Joi.string().required(),
        launchDate: Joi.string().required(),
        rating: Joi.number().min(0).max(100).required(),
        result: Joi.string().required(),
        chain: Joi.string().required(),
        category: Joi.string().required(),
        usdTVL: Joi.number().min(0).precision(9),
        ethTVL: Joi.number().min(0).precision(9),
        btcTVL: Joi.number().min(0).precision(9),
        usdTVLChanged: Joi.number().min(0).precision(9),
        ethTVLChanged: Joi.number().min(0).precision(9),
        btcTVLChanged: Joi.number().min(0).precision(9),
        ethLocked: Joi.number().min(0).precision(9),
        btcLocked: Joi.number().min(0).precision(9)
    });
    return schema.validate(project);
};

module.exports = {
    project
};