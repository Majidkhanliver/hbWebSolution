const express = require('express');
const router = express.Router();
const { addSection, getSection, getAll, deleteSection, updateSection } = require('../Controller/SectionController')
router.post('/', addSection)
router.get('/', getAll)
router.get('/:id', getSection)
router.delete('/:id', deleteSection)
router.put('/:id', updateSection)
module.exports = router;