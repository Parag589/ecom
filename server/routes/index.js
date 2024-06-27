const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const { addToCart, getCart, updateProductQuantity, removeProductFromCart } = require('../controllers/cartController');
const auth = require('../middleware/auth');

// User routes
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/user', auth, userController.getUser);

// Product routes
router.post('/createProduct', productController.createProduct);
router.get('/products', productController.getProducts);
router.get('/sellerProducts', productController.getSellerProducts);

router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

//Cart routes
router.post('/addToCart', addToCart);
router.get('/cart/:userId', getCart);
router.put('/cart/:userId/product/:productId', updateProductQuantity);
router.delete('/cart/:userId/product/:productId', removeProductFromCart);

module.exports = router;
