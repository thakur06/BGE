const User = require("../models/user");
const jwt = require("jsonwebtoken");

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
