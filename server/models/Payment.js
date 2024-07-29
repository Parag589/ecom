const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    userID: { type: String, unique: true },
    orderId: String,
    paymentMethod: String,
    paymentStatus: String,
    paymentDate: { type: Date, default: Date.now },
    amount: Number
});

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;