// const mongoose = require('mongoose');

// const CartSchema = new mongoose.Schema({
//     userid: Number,
//     productid: mongoose.Schema.Types.ObjectId,
//     productname: String,
//     productprice: Number,
//     productquantity: Number,
//     amountpayable: Number
// });

// const Cart = mongoose.model('Cart', CartSchema);

// module.exports = Cart;


const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productid: String,
  productname: String,
  productprice: Number,
  productquantity: Number,
  amountpayable: Number
});

const CartSchema = new mongoose.Schema({
  userid: {type:String, required:true},
  products: [ProductSchema]
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
