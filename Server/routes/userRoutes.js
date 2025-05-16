const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes
router.post('/new-user', userController.createUser);                // creates a new user 
router.get('/all-users', userController.getAllUsers);              // returns all users 
router.post('/login', userController.loginUser);                  // user login 
router.post('/forgot-password', userController.forgotPassword);  // Forgot password email
router.post('/reset-password', userController.resetPassword);   // resets user password

module.exports = router;