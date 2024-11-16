const nodemailer = require('nodemailer');

const sendAlertEmail = async (userEmail, location) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: 'no-reply@myapp.com',
        to: userEmail,
        subject: 'Connexion suspecte détectée',
        text: `Une connexion inhabituelle a été détectée depuis : ${location}. Si ce n'était pas vous, veuillez sécuriser votre compte immédiatement.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Alert email sent successfully.');
    } catch (error) {
        console.error('Error sending alert email:', error);
    }
};

module.exports = { sendAlertEmail };
