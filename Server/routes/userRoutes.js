const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes
router.post('/new-user', userController.createUser);
router.get('/all-users', userController.getAllUsers);
router.post('/login', userController.loginUser);
module.exports = router;