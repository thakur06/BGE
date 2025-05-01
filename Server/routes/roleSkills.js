const express = require('express');
const router = express.Router();
const roleSkillController = require('../controllers/roleSkillsController');

router.post('/', roleSkillController.assignSkillToRole);
router.get('/', roleSkillController.getRoleSkills);

module.exports = router;
