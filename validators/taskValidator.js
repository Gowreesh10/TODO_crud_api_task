const Joi = require('joi');

const taskSchema = Joi.object({
    title: Joi.string().trim().min(1).required(),
    description: Joi.string().trim().min(1).required(),
    status: Joi.string().valid('pending', 'in-progress', 'completed').default('pending')
});

module.exports = { taskSchema };
