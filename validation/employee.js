const Joi = require('joi');

const validator = (schema) => (payload) => schema.validate(payload, {abortEarly: false});

const userSchema = Joi.object({
    name : Joi.string().required(),
    email : Joi.string().email().required(),
    age : Joi.number().required()
});

module.exports = validator(userSchema);


