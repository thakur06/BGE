const RoleSkill = require('../models/roleSkills');

exports.assignSkillToRole = async (req, res) => {
  try {
    const roleSkill = new RoleSkill(req.body);
    await roleSkill.save();
    res.status(201).json(roleSkill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getRoleSkills = async (req, res) => {
  try {
    const skills = await RoleSkill.find()
      .populate('role')
      .populate('skill');
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};