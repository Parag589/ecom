const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const fileUpload = require('express-fileupload')

const app = express();
const PORT = 5000;
const dbURI = 'mongodb+srv://paragagarwal0589:parag@ecom.g1z5xel.mongodb.net/?retryWrites=true&w=majority&appName=ecom';

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload({    
    useTempFiles: true
    }));

// Connect to MongoDB
mongoose.connect(dbURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/', routes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
