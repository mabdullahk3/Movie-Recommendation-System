const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    preferences: [String], 
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    isAdmin: { type: Boolean, default: false }, 
},{
    timestamps: true,
});

// hashing password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10); // 10 - value of salt
    next();
});

// compare password during login
userSchema.methods.matchPassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

// create model and export it
module.exports = mongoose.model('User', userSchema);