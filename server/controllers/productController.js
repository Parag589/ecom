const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2;


const createProduct = async (req, res) => {
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


const getSellerProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error in getProducts:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Parse page from query parameter, default to 1
    const limit = 8; // Number of products per page

    const skip = (page - 1) * limit; // Calculate how many documents to skip
    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await Product.find()
      .skip(skip)
      .limit(limit);

    res.json({
      products,
      currentPage: page,
      totalPages
    });
  } catch (error) {
    console.error('Error in getProducts:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};


const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { productname, productdescription, price } = req.body;

    try {
        let updateFields = { productname, productdescription, price };

        // Check if a new image is being uploaded
        if (req.files && req.files.photo) {
            const file = req.files.photo;
            
            // Upload new image to Cloudinary
            const result = await cloudinary.uploader.upload(file.tempFilePath);
            
            // Add imagePath to updateFields
            updateFields.imagePath = result.url;
        }

        await Product.findByIdAndUpdate(id, updateFields, { new: true });
        res.status(200).json({ msg: 'Product updated successfully' });
    } catch (error) {
        console.error('Error in updateProduct:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ msg: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error in deleteProduct:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    getSellerProducts
};
