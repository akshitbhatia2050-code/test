const express = require('express');
const {
    addAssessment,
    getAllAssessments,
    getAssessmentsByStudent,
    updateAssessment,
    deleteAssessment,
} = require('../controllers/assessmentController');

const router = express.Router();

router.post('/add', addAssessment);
router.get('/', getAllAssessments);
router.get('/:studentId', getAssessmentsByStudent);
router.put('/:id', updateAssessment);
router.delete('/:id', deleteAssessment);

module.exports = router;