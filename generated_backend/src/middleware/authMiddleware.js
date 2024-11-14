// Import JSON Web Token library for verifying tokens
const jwt = require('jsonwebtoken');

// Define the authentication middleware function
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });
    try {
        // Verify the token using the secret key and decode it to get the user's information
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        // Pass control to the next middleware or route handler
        next();
    } catch (error) {
        res.status(401).json({ message: "Token is not valid" });
    }
};
module.exports = authMiddleware;
