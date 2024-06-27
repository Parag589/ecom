const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
// const cartRoutes = require('./routes/cart')

const app = express();
const PORT = 5000;
const dbURI = 'mongodb+srv://paragagarwal0589:parag@ecom.g1z5xel.mongodb.net/?retryWrites=true&w=majority&appName=ecom';

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/', routes);
// app.use('/cart', cartRoutes); 

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
