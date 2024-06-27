const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    type: mongoose.Schema.Types.ObjectId,
    productid: mongoose.Schema.Types.ObjectId,
    productname: String,
    productprice: Number,
    productquantity: Number,
    amountpayable: Number
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
