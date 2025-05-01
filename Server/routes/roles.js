const express = require('express');
const router = express.Router();
const roleController = require('../controllers/rolecontroller')

router.post('/', roleController.createRole);
router.get('/', roleController.getRoles);

module.exports = router;