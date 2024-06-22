const { STATUS } = require('../constant');

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(STATUS.BAD_REQUEST).json({ message: error.details[0].message });
    }
    next();
};

module.exports = validate;
