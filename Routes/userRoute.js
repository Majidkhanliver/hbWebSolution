const express = require('express');
const router = express.Router();
const { signup, login } = require('../Controller/userController')
router.get('/', signup);
router.post('/', login)
module.exports = router;