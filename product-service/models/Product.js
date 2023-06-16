const mongoose = require("mongoose");

var ProductPicture = new mongoose.Schema({
    name: String,
    path: String,
    mime: String,
    size: Number,
    default: Boolean
});

var Attribute = new mongoose.Schema({
    name: String,
    value: String
});

var productSchema = new mongoose.Schema({
    name: String,
    category: mongoose.Types.ObjectId,
    brand: String,
    originalPrice: Number,
    currentPrice: Number,
    productPictures: [ProductPicture],
    stockQty: Number,
    attributes: [Attribute]
});

// productSchema.set( 'toJSON', {
//     virtuals: true
// })

module.exports = mongoose.model('Product', productSchema);

