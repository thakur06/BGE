const express = require('express');
const router = express.Router();
const { createRoleSkills } = require('../controllers/rolecontroller');

router.post('/', createRoleSkills);

module.exports = router;