const express = require('express');
const router = express.Router();
const { addToCart,getCart } = require('../controllers/cartController');

router.post('/addToCart', addToCart);
router.get('/addToCart', addToCart);


module.exports = router;
