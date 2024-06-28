const cloudinary = require('cloudinary').v2;
const Product = require('../models/Product');

exports.imageController = async (req, res, next) => {
  try {
    console.log(req.files);
    const file = req.files.photo;

    // Upload image to Cloudinary
    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      if (err) {
        console.error('Error uploading image:', err);
        return res.status(500).json({ msg: 'Error uploading image' });
      }

      const { productname, productdescription, price } = req.body;

      if (!productname || !productdescription || !price) {
        return res.status(400).json({ msg: 'Please enter all fields' });
      }

      try {
        const productExists = await Product.findOne({ productname });

        if (productExists) {
          return res.status(400).json({ msg: 'Product already exists' });
        }

        const newProduct = new Product({
          productname,
          productdescription,
          price,
          imagePath: result.url
        });

        await newProduct.save();

        return res.status(201).json({ msg: 'Product created successfully' });
      } catch (error) {
        console.error('Error in createProduct:', error);
        return res.status(500).json({ msg: 'Server error' });
      }
    });
  } catch (error) {
    console.error('Error in imageController:', error);
    return res.status(500).json({ msg: 'Server error' });
  }
};
