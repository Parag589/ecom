const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://paragagarwal0589:parag@ecom.g1z5xel.mongodb.net/?retryWrites=true&w=majority&appName=ecom';

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, {});
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
