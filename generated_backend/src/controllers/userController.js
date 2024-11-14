const User = require('../models/User');

// Define the getProfile function to handle retrieving the user's profile
exports.getProfile = async (req, res) => {
    try {
        // Find the user by ID from the request, excluding the password field from the result
        const user = await User.findById(req.user.id).select('-password');
        
        // If the user is not found, send a 404 response
        if (!user) return res.status(404).json({ message: "User not found" });

        // Send the user profile data in the response
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve profile", error });
    }
};
