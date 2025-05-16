const User = require("../models/user");
const jwt = require("jsonwebtoken");
const sendForgotPasswordEmail = require('../mail/handler/forgotPassword');
const crypto = require('crypto');
// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, reportsto, reportshimher, role, dept } =
      req.body;
    const user = new User({
      username,
      email,
      password,
      reportsto,
      reportshimher,
      role,
      dept,
    });
    await user.save();
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("reportsto reportshimher");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User login route
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      dept: user.dept,
      reportsto: user.reportsto,
      reportshimher: user.reportshimher,
    };

    res
      .status(200)
      .json({ message: "Login successful", user: userData, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Forgot Password: Send reset email
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });
 console.log(user)
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

  try {
    await sendForgotPasswordEmail(user.email, resetLink,user.username);
    res.json({ message: 'Reset email sent successfully' });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500).json({ message: 'Failed to send email', error: err.message });
  }
};

// Reset Password: Validate token and update password
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    return res.status(400).json({ message: 'Token and new password are required' });
  }

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  console.log(user)
  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }

  user.password = newPassword; // Will be hashed by pre-save hook
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ message: 'Password has been reset successfully' });
};