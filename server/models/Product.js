const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productname: String,
    productdescription: String,
    price: Number
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
