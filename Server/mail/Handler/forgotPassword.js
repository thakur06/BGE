const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const { createTransporter } = require("../Gmail_transporter");

/**
 * Send a forgot password email
 * @param {string} toEmail - Recipient's email address
 * @param {string} resetLink - URL to reset the password
 */
async function sendForgotPasswordEmail(toEmail, resetLink ,username) {
  try {
   const mytemplate=`
   <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
    <style>
      /* Base Styles */
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f7f9fc;
        margin: 0;
        padding: 0;
        color: #333;
        line-height: 1.6;
      }
      
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
      }
      
      /* Header Styles */
      .header {
        text-align: center;
        padding: 30px 20px 20px;
        background-color: #ffffff;
        border-bottom: 1px solid #eaedf3;
      }
      
      .logo-container {
        margin-bottom: 20px;
      }
      
      .logo {
        max-height: 60px;
        max-width: 200px;
      }
      
      .company-name {
        font-size: 18px;
        font-weight: 600;
        color: #2c3e50;
        margin-top: 5px;
      }
      
      /* Content Styles */
      .content {
        padding: 30px 40px;
        color: #4a5568;
      }
      
      h2 {
        color: #2c3e50;
        font-size: 24px;
        font-weight: 600;
        margin-top: 0;
        margin-bottom: 20px;
      }
      
      p {
        margin-bottom: 16px;
        font-size: 16px;
      }
      
      .highlight {
        color: #2c3e50;
        font-weight: 600;
      }
      
      /* Button Styles */
      .button-container {
        text-align: center;
        margin: 30px 0;
      }
      
      a.button {
        display: inline-block;
        padding: 14px 30px;
        background-color: #4361ee;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-weight: 600;
        font-size: 16px;
        transition: background-color 0.2s ease;
        box-shadow: 0 2px 6px rgba(67, 97, 238, 0.3);
      }
      
      a.button:hover {
        background-color: #3a56d4;
      }
      
      /* Information Box */
      .info-box {
        background-color: #f0f4ff;
        border-left: 4px solid #4361ee;
        padding: 15px 20px;
        margin: 25px 0;
        border-radius: 4px;
      }
      
      /* Footer Styles */
      .footer {
        font-size: 13px;
        color: #a0aec0;
        text-align: center;
        padding: 20px;
        background-color: #f9fafc;
        border-top: 1px solid #eaedf3;
      }
      
      .help-text {
        margin-top: 20px;
        font-size: 14px;
        color: #718096;
      }
      
      /* Responsive Adjustments */
      @media only screen and (max-width: 480px) {
        .container {
          margin: 0;
          border-radius: 0;
        }
        
        .content {
          padding: 20px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Header with Logo -->
      <div class="header">
        <div class="logo-container">
          <!-- Replace with your company logo -->
          <img src="https://biogaseng.com/wp-content/uploads/2019/05/logo_main_B.jpg" alt="Company Logo" class="logo">
          <div class="company-name">Biogas Engineering</div>
        </div>
      </div>
      
      <!-- Main Content -->
      <div class="content">
        <h2>Password Reset Request</h2>
        <p>Hello <span class="highlight">${username}</span>,</p>
        <p>We received a request to reset the password for your account. To create a new password, click on the button below:</p>
        
        <div class="button-container">
          <a href="${resetLink}" class="button">Reset Password</a>
        </div>
        
        <div class="info-box">
          <p style="margin: 0;"><strong>Important:</strong> This link one time link.</p>
        </div>
        
        <p>If you didn't request this password reset, please ignore this email or contact our support team if you have concerns about your account security.</p>
        
        <p class="help-text">If you're having trouble clicking the button, copy and paste the URL below into your web browser:</p>
        <a style="word-break: break-all; font-size: 14px; color: #4361ee;">${resetLink}</a>
      </div>
      
      <!-- Footer -->
      <div class="footer">
        <p>&copy; 2025 Biogas Engineering All rights reserved.</p>
        <p>
SCO-10, 2nd Floor, Market Place – 1, Vatika India
Next Sector 83, Gurugram-122004, Haryana, India
</p>
      </div>
    </div>
  </body>
</html>
   `
    const transporter = createTransporter();
    console.log(resetLink)
    const templatePath = path.join(__dirname, "forgotPassword.html");
    if (!fs.existsSync(templatePath)) {
      console.error("❌ Template not found at:", templatePath);
      return;
    } else {
      const htmlTemplate = fs.readFileSync(templatePath, "utf8");
    }
    let htmlTemplate = fs.readFileSync(templatePath, "utf8");

    // Replace placeholders
    htmlTemplate = htmlTemplate
      .replace("{{name}}", toEmail.split("@")[0]) // You can customize this logic
      .replace("{{resetLink}}", resetLink);

    // 3. Setup mail options
    const mailOptions = {
      from: process.env.APP_NOREPLY,
      to: toEmail,
      subject: "Reset Your Password",
      html: mytemplate,
    };

    // 4. Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${toEmail}:`, info.response);
  } catch (error) {
    console.error("Failed to send password reset email:", error);
  }
}

module.exports = sendForgotPasswordEmail;
