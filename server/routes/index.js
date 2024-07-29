const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const imageController = require('../controllers/imageController');
const PaymentController = require('../controllers/PaymentController')
require('dotenv').config();

const auth = require('../middleware/auth');
const cloudinary = require('cloudinary').v2;

 // Configuration
 cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});



// User routes
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/user', auth, userController.getUser);
router.post('/forgot-password', userController.forgotPassword);


// Product routes
router.post('/createProduct', productController.createProduct);
router.get('/products', productController.getProducts);
router.get('/sellerProducts', productController.getSellerProducts);
router.put('/products/:id', productController.updateProduct); 
router.delete('/products/:id', productController.deleteProduct);
router.post('/image', imageController.imageController);

//Cart routes
router.post('/addToCart', cartController.addToCart);
router.get('/cart/:userId', cartController.getCart);
router.put('/cart/:userId/product/:productId', cartController.updateProductQuantity);
router.delete('/cart/:userId/product/:productId', cartController.removeProductFromCart);

//Payment routes

// router.post('/payment',PaymentController.makePayment);

module.exports = router;
