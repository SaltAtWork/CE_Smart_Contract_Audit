const Joi = require('joi');

function project(project) {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        attackHistory: Joi.string().required(),
        riskAnalysis: Joi.string().required(),
        usdTVL: Joi.number().min(0).precision(2).required(),
        ethTVL: Joi.number().min(0).precision(2).required(),
        btcTVL: Joi.number().min(0).precision(2).required(),
        ethLocked: Joi.number().min(0).precision(2).required(),
        btcLocked: Joi.number().min(0).precision(2).required()
    });
    return schema.validate(project);
};

module.exports = {
    project
};