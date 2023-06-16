const mongoose = require("mongoose");

var categorySchema = new mongoose.Schema({
    name: String,
    parent: mongoose.Types.ObjectId
});

// productSchema.set( 'toJSON', {
//     virtuals: true
// })

module.exports = mongoose.model('Category', categorySchema);

