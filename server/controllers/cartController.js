const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
    const { userid, productid, productname, productprice, productquantity } = req.body;

    try {
      // Find the user's cart
      let cart = await Cart.findOne({ userid });
  
      if (cart) {
        // Check if the product is already in the cart
        let product = cart.products.find(p => p.productid === productid);
  
        if (product) {
          // Update the product quantity and amount payable
          product.productquantity += productquantity;
          product.amountpayable = product.productprice * product.productquantity;
        } else {
          // Add new product to the cart
          const newProduct = {
            productid,
            productname,
            productprice,
            productquantity,
            amountpayable: productprice * productquantity
          };
          cart.products.push(newProduct);
        }
  
        await cart.save();
        res.status(200).json({ msg: 'Cart updated successfully' });
      } else {
        // If the cart does not exist, create a new cart
        const newCart = new Cart({
          userid,
          products: [{
            productid,
            productname,
            productprice,
            productquantity,
            amountpayable: productprice * productquantity
          }]
        });
        await newCart.save();
        res.status(201).json({ msg: 'Cart created successfully' });
      }
    } catch (error) {
      res.status(500).json({ msg: 'Error adding product to cart', error });
    }
};
