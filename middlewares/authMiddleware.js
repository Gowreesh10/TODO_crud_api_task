const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { STATUS } = require('../constant');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(STATUS.UNAUTHORIZED).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (err) {
        res.status(STATUS.UNAUTHORIZED).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
