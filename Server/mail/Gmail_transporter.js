const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail', // Can be changed to 'SendGrid', 'Mailtrap', etc. for production
    auth: {
     user: process.env.NODEMAILER_EMAIL,
    pass: process.env.APP_PASS, 
    },
    pool: true, // Enable connection pooling for efficiency
    maxConnections: 5, // Max concurrent connections
    maxMessages: Infinity, // Allow unlimited messages per connection
    rateLimit: 7 / 60, // 7 emails per minute (rate per second)
  });
};

module.exports = { createTransporter };