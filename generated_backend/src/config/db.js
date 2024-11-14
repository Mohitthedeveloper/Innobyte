// Import the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Attempt to connect to the MongoDB database using the connection URI from environment variables
        await mongoose.connect(process.env.MONGODB_URI, { 
            useNewUrlParser: true,
            useUnifiedTopology: true 
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);   
        // Exit the process with a failure code (1) to indicate the error
        process.exit(1);
    }
};
module.exports = connectDB;
