const mongoose = require("mongoose");

var cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true },
    totalAmount: { type: Number, required: true },
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);

