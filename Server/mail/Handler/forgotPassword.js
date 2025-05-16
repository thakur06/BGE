const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

/**
 * Send a forgot password email
 * @param {string} toEmail - Recipient's email address
 * @param {string} resetLink - URL to reset the password
 */
async function sendForgotPasswordEmail(toEmail, resetLink) {
  try {
    


    const templatePath = path.join(__dirname, 'Templates', 'forgotPassword.html');
    let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

    // Replace placeholders
    htmlTemplate = htmlTemplate
      .replace('{{name}}', toEmail.split('@')[0]) // You can customize this logic
      .replace('{{resetLink}}', resetLink);

    // 3. Setup mail options
    const mailOptions = {
      from: process.env.APP_NOREPLY,
      to: toEmail,
      subject: 'Reset Your Password',
      html: htmlTemplate,
    };

    // 4. Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${toEmail}:`, info.response);
  } catch (error) {
    console.error('Failed to send password reset email:', error);
  }
}

module.exports = sendForgotPasswordEmail;
