const Role = require('../models/role');

exports.createRole = async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res.status(201).json(role);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.getRoles = async (req, res) => {
    try {
      const roles = await Role.find();
      res.json(roles);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  