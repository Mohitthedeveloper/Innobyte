const express = require('express');

const { signup, login } = require('../controllers/authController');
const { getProfile } = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware');

// Create an instance of the express router
const router = express.Router();

const jwt = require('jsonwebtoken');

const User = require('../models/User');

// Route for user signup, handled by the signup controller function
router.post('/signup', signup);

// Route for user login, handled by the login controller function
router.post('/login', login);

// Route to get user profile, protected by the auth middleware
router.get('/profile', authMiddleware, getProfile);

// Route for email confirmation with a token parameter
router.get('/confirm/:token', async (req, res) => {
    // Extract the token from the request parameters
    const { token } = req.params;
    
    try {
        // Verify the token using the secret key and decode it to get the user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find the user in the database using the decoded user ID
        const user = await User.findById(decoded.id);

        if (!user) return res.status(404).json({ message: "User not found" });

        // Set the user's confirmation status to true
        user.isConfirmed = true; // Add this field in the User model
        
        await user.save();

        res.status(200).json({ message: "Email confirmed successfully" });
    } catch (error) {
        res.status(400).json({ message: "Invalid or expired confirmation link" });
    }
});

module.exports = router;
