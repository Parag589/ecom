const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const fileUpload = require('express-fileupload')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;
const dbURI = process.env.CONNECTION_URL;

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
