const express = require('express');
const validate = require('../middlewares/validateMiddleware');
const { registerUser, loginUser } = require('../controllers/authController');
const { registerSchema, loginSchema } = require('../validators/authValidator');
const router = express.Router();

router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);

module.exports = router;
