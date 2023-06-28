const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
var userSchema = new mongoose.Schema({
});
var userSchema = new mongoose.Schema({
    // username: { type: mongoose.Types.ObjectId, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    first_name: { type: String },
    last_name: { type: String },
    role: { type: String, required: true, enum: ['USER', 'ADMIN'], default: 'USER' },
    gender: { type: String },
    dob: { type: Date },
    preferences: { type: Map, of: String },
    is_active: { type: Boolean, default: true },
    profile_picture: { type: String }    
}, {
    timestamps: true
});

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (error) {
        return next(error);
    }
  });

module.exports = mongoose.model('User', userSchema);

