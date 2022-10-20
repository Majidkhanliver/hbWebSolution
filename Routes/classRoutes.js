const express = require('express');
const router = express.Router();
const { getClasses, postClass, updateClass, delteClass, getClass } = require('../Controller/classController')
router.get('/', getClasses);
router.post('/', postClass)
router.get('/:id', getClass);
router.put("/:id", updateClass);
router.delete("/:id", delteClass);
module.exports = router;