const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your_jwt_secret_key';

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const dbURI = 'mongodb+srv://paragagarwal0589:parag@ecom.g1z5xel.mongodb.net/?retryWrites=true&w=majority&appName=ecom';
mongoose.connect(dbURI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// User schema and model
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    role: String
});

const User = mongoose.model('User', UserSchema);

// Product schema and model
const ProductSchema = new mongoose.Schema({
    productname: String,
    productdescription: String,
    price: Number
});

const Product = mongoose.model('Product', ProductSchema);

// Signup route
app.post('/signup', async (req, res) => {
    const { usernames, passwords, role } = req.body;
    let username = usernames;
    let password = passwords;

    if (!username || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const userExists = await User.findOne({ username });

    if (userExists) {
        return res.status(400).json({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        password: hashedPassword,
        role
    });

    await newUser.save();

    res.status(201).json({ msg: 'User created successfully' });
});

// Create Product route
app.post('/createProduct', async (req, res) => {
    const { productname, productdescription, price } = req.body;

    if (!productname || !productdescription || !price) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

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
});

// Fetch all products route
app.get('/products', async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ msg: 'Error fetching products' });
    }
  });
  
  // Update product route
  app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { productname, productdescription, price } = req.body;
    
    try {
      await Product.findByIdAndUpdate(id, { productname, productdescription, price });
      res.status(200).json({ msg: 'Product updated successfully' });
    } catch (error) {
      res.status(500).json({ msg: 'Error updating product' });
    }
  });
  
  // Delete product route
  app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json({ msg: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ msg: 'Error deleting product' });
    }
  });
  

// Signin route
app.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(400).json({ msg: 'User does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
});

// Middleware to verify token
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
};

// Protected route
app.get('/user', auth, async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
