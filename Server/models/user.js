// userSchema.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  reportsto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to another User (self-referential)
    default: null, // Null if no manager
  },
  reportshimher: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Array of User IDs who report to this user
  }],
  role: {
    type: String,
    required: [true, 'Role is required'],
    default: 'employee',
  },
  dept: {
    type: String,
    required: [true, 'Department is required'],
    trim: true,
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Pre-save hook to hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords for login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;