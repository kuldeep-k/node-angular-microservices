const mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true },
    orderNo: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, default: "Draft" },
    paid: { type: Boolean, default: false },
    shipped: { type: Boolean, default: false },
    orderDate: { type: Date },
    paidDate: { type: Date }, 
    shipDate: { type: Date },   
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);

