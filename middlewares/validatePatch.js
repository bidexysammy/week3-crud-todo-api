const joi = require('joi');

const validatePatch = (req, res, next) => {
    const schema = joi.object({
        task: joi.string().min(3).max(10000),
        completed: joi.boolean().default(false),
    });
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(404).json({message: error.details[0].message});
    }
    next();
}
module.exports = validatePatch;