const express = require('express');
const router = express.Router();
const { signup, login, generateToken, postNewPassword } = require('../Controller/userController')
router.get('/', signup);
router.post('/', login);
router.post('/reset-password', generateToken);
router.post('/change-password/:token', postNewPassword)
module.exports = router;