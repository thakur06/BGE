const mongoose = require('mongoose');

const subSkillSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: {
    type: String,
    enum: ['Soft Skill', 'Technical Skill', 'Software Skills', 'Cross Functional Skills', 'Project Management Skills'],
    required: true
  },
  subskills: [subSkillSchema]
});

module.exports = mongoose.model('Skill', skillSchema);
