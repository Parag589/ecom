const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
    const { userid, productid, productname, productprice, productquantity,imagePath } = req.body;

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
            amountpayable: productprice * productquantity,
            imagePath
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
            amountpayable: productprice * productquantity,
            imagePath

          }]
        });
        await newCart.save();
        res.status(201).json({ msg: 'Cart created successfully' });
      }
    } catch (error) {
      res.status(500).json({ msg: 'Error adding product to cart', error });
    }
};


exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userid: req.params.userId });
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Cart not found for this user.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update the quantity of a product in the cart
exports.updateProductQuantity = async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userid: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const product = cart.products.find(p => p.productid === productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    product.productquantity = quantity;
    product.amountpayable = product.productprice * quantity;

    await cart.save();
    res.json({ message: 'Product quantity updated successfully', cart });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};



exports.removeProductFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const cart = await Cart.findOne({ userid: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user.' });
    }

    // Find the index of the item to remove
    const itemIndex = cart.products.findIndex(item => item.productid === productId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in the cart.' });
    }

    // Remove the item from the array
    cart.products.splice(itemIndex, 1);

    // Save the updated cart
    await cart.save();

    res.json(cart); // Send back the updated cart
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};