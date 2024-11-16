const nodemailer = require('nodemailer');
require("dotenv").config();

const sendAlertEmail = async (userEmail, location = "Unknown") => {
    // Debug logs
    console.log("Starting email send process");
    console.log("Environment variables check:");
    console.log("EMAIL_USER exists:", !!process.env.EMAIL_USER);
    console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);
    console.log("EMAIL_USER length:", process.env.EMAIL_USER?.length);
    console.log("EMAIL_PASS length:", process.env.EMAIL_PASS?.length);

    // Create transporter with more detailed options
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        debug: true, // Enable debug logs
        logger: true // Enable logger
    });

    // Test configuration
    try {
        console.log("Verifying transporter configuration...");
        await transporter.verify();
        console.log("Transporter verification successful");
    } catch (error) {
        console.error("Transporter verification failed:", {
            message: error.message,
            code: error.code,
            response: error.response,
            stack: error.stack
        });
        throw error;
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Connexion suspecte détectée',
        text: `Une connexion inhabituelle a été détectée depuis : ${location}. Si ce n'était pas vous, veuillez sécuriser votre compte immédiatement.`,
    };

    try {
        console.log("Attempting to send email with options:", {
            from: mailOptions.from,
            to: mailOptions.to,
            subject: mailOptions.subject
        });
        
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info);
        return info;
    } catch (error) {
        console.error("Email send failed:", {
            message: error.message,
            code: error.code,
            response: error.response,
            command: error.command
        });
        throw error;
    }
};

//  sendAlertEmail("yahiachiah2@gmail.com", "Test Location");



module.exports = { sendAlertEmail };