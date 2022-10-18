const express = require('express');
const router = express.Router();
const { addStudent, getAllStudents, getStudent, updateStudent, deleteStudent } = require('../Controller/studentController')
router.post('/', addStudent);
router.get('/', getAllStudents)
router.get('/:id', getStudent)
router.put('/:id', updateStudent)
router.delete('/:id', deleteStudent)



module.exports = router;