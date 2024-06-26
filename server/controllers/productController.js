const Product = require('../models/Product');

const createProduct = async (req, res) => {
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
            price
        });

        await newProduct.save();

        res.status(201).json({ msg: 'Product created successfully' });
    } catch (error) {
        console.error('Error in createProduct:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error in getProducts:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { productname, productdescription, price } = req.body;

    try {
        await Product.findByIdAndUpdate(id, { productname, productdescription, price });
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
    deleteProduct
};
