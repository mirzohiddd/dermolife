const express = require('express');
const { registerHandler } = require('../controllers/register.controller');
const { registerLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/register', registerLimiter, registerHandler);

module.exports = router;
