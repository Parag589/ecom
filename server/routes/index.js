const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const { addToCart, getCart, updateProductQuantity, removeProductFromCart } = require('../controllers/cartController');
const { imageController } = require('../controllers/imageController');

const auth = require('../middleware/auth');
const cloudinary = require('cloudinary').v2;

 // Configuration
 cloudinary.config({ 
    cloud_name: 'dwobgpux4', 
    api_key: '321497243177566', 
    api_secret: 'F0g5hgvpjIjMBJNesdkscm8hzHg' // Click 'View Credentials' below to copy your API secret
});


router.post('/image', imageController);

// User routes
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/user', auth, userController.getUser);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password/:token', userController.resetPassword);


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
