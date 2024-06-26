const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

// User routes
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/user', auth, userController.getUser);

// Product routes
router.post('/createProduct', productController.createProduct);
router.get('/products', productController.getProducts);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;