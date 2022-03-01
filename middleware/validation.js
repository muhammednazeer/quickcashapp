const Joi = require('joi');

//VALIDATION
const registerValidation = (data) => {
    const validationSchema = Joi.object({
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return validationSchema.validate(data);
};

const loginValidation = (data) => {
    const validationSchema = Joi.object( {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return validationSchema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;


