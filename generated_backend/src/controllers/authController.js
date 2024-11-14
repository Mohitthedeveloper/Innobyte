const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendConfirmationEmail = require('../utils/sendEmail');

// Signup function to handle user registration
exports.signup = async (req, res) => {
    // Destructure username, email, and password from the request body
    const { username, email, password } = req.body;
    
    try {
        // Create a new user instance with the provided data
        const user = new User({ username, email, password }); 
        await user.save();
        const confirmationToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const confirmationLink = `http://localhost:3000/api/confirm/${confirmationToken}`;
        // Define the email content for confirmation
        const emailContent = `
            <h1>Email Confirmation</h1>
            <p>Hi ${username},</p>
            <p>Thank you for registering. Please confirm your email by clicking the link below:</p>
            <a href="${confirmationLink}">Confirm Email</a>
            <p>This link will expire in 24 hours.</p>
        `;
        // Send the confirmation email with the generated content
        await sendConfirmationEmail(email, "Email Confirmation", emailContent);
        // Send a success response to the client
        res.status(201).json({ message: "User registered successfully. Please check your email to confirm." });
    } catch (error) {
        res.status(400).json({ message: "User registration failed", error });
    }
};

// Login function to handle user authentication
exports.login = async (req, res) => {
    // Destructure email and password from the request body
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });    
        // Check if user exists and if the provided password is correct
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        if (!user.isConfirmed) {
            return res.status(403).json({ message: "Please confirm your email before logging in." });
        }
        // Generate a JWT token for the authenticated user with a 1-hour expiration
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Send the token in the response
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error });
    }
};

// Email confirmation function to handle email verification
exports.confirmEmail = async (req, res) => {
    const { token } = req.params;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        user.isConfirmed = true;
        // Save the updated user status in the database
        await user.save();
        res.status(200).json({ message: "Email confirmed successfully" });
    } catch (error) {
        res.status(400).json({ message: "Invalid or expired confirmation link" });
    }
};
