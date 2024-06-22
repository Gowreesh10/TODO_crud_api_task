const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { STATUS } = require('../constant');
const dotenv = require('dotenv');
dotenv.config();

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(STATUS.CONFLICT).json({ message: 'User already exists' });// conflict with the current state of the target resource
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        const payload = {
            id: user.id
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRATION_TIME }); // the payload, a secret key, and options.

        res.status(STATUS.CREATED).json({ token, message: 'Token created'});
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(STATUS.UNAUTHORIZED).json({ message: 'Invalid credentials' }); //unauthorized or authentication failures
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(STATUS.UNAUTHORIZED).json({ message: 'Invalid credentials' });
        }

        const payload = {
            id: user.id
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRATION_TIME });

        res.status(STATUS.OK).json({ token });
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
    }
};

module.exports = { registerUser, loginUser };
