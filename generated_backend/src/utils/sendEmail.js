require('dotenv').config();

console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

const nodemailer = require('nodemailer');

// Create a transporter object using Gmail's SMTP server
const transporter = nodemailer.createTransport({
    service: 'gmail', // Specify the email service provider
    auth: {
        user: process.env.EMAIL_USER, // Use environment variable for email user
        pass: process.env.EMAIL_PASS  // Use environment variable for email password
    },
    logger: true, 
    debug: true,  
});

// Define a function to send a confirmation email
const sendConfirmationEmail = async (to, subject, text) => {
    try {
        // Send an email using the configured transporter
        await transporter.sendMail({
            from: process.env.EMAIL_USER, // Set the sender's email address
            to,                            // Recipient's email address
            subject,                       // Subject of the email
            html: text                     // Email content in HTML format
        });
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Could not send confirmation email");
    }
};

module.exports = sendConfirmationEmail;
