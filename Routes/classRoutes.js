const express = require('express');
const router = express.Router();
const { getClasses, postClass } = require('../Controller/classController')
router.get('/', getClasses);
router.post('/', postClass)
module.exports = router;