const mongoose = require("mongoose");

var orderDetailsSchema = new mongoose.Schema({
    orderId: mongoose.Types.ObjectId,
    productId: mongoose.Types.ObjectId,
    qty: Number,
    price: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('OrderDetails', orderDetailsSchema);

