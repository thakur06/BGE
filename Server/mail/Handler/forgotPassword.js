const mailOptions = {
  from: "",
  to: 'user@example.com',
  subject: 'Reset Password',
  html: htmlTemplate.replace('{{name}}', 'John').replace('{{verificationLink}}', 'https://example.com/verify?token=abc123'),
};