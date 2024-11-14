const express = require('express');

const dotenv = require('dotenv');

const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');

dotenv.config();

connectDB();

// Create an instance of an express application
const app = express();

// Use express.json middleware to parse incoming JSON requests
app.use(express.json());

// Set up a route for API endpoints, prefixing them with '/api'
app.use('/api', authRoutes);

// Define the server port, using the PORT environment variable or defaulting to 3000
const PORT = process.env.PORT || 3000;

// Start the server and log the port it's running on
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
