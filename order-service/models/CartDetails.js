const mongoose = require("mongoose");

var cartDetailsSchema = new mongoose.Schema({
    cartId: mongoose.Types.ObjectId,
    productId: mongoose.Types.ObjectId,
    qty: Number,
    price: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('CartDetails', cartDetailsSchema);

