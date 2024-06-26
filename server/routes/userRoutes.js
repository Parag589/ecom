const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');

// Protected route to get user information
router.get('/user', auth, authController.getUser);

module.exports = router;
