const RoleSkills = require('../models/roleSkills');

const createRoleSkills = async (req, res) => {
  try {
    const roleSkills = new RoleSkills(req.body);
    const newRoleSkills = await roleSkills.save();
    res.status(201).json(newRoleSkills);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createRoleSkills };