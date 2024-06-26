const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.get('/user', auth, authController.getUser);

module.exports = router;
