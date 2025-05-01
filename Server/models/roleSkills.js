const mongoose=require("mongoose")
const roleSkillSchema = new mongoose.Schema({
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
    subskillLevels: [{
      name: { type: String, required: true },   // matches subskill name from Skill
      level: { type: Number, min: 0, max: 5 }    // level per role per subskill
    }]
  });
  
  module.exports = mongoose.model('RoleSkill', roleSkillSchema);
  