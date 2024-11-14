const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define a schema for the User collection
const userSchema = new mongoose.Schema({
    username: { type: String, required: true }, // Username is required
    email: { type: String, required: true, unique: true }, // Email is required and must be unique
    password: { type: String, required: true }, // Password is required
    isConfirmed: { type: Boolean, default: false } // Track if the user's email is confirmed
});

// Define a pre-save middleware to hash the password before saving to the database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Define a method to compare a given password with the stored hashed password
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
