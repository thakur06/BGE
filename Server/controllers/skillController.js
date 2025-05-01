const Skill = require('../models/skill');

exports.createSkill = async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getSkills = async (req, res) => {
    try {
      const skills = await Skill.find();
      res.json(skills);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  