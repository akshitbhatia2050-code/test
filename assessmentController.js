const Assessment = require('../models/Assessment');

// Add a new assessment
exports.addAssessment = async (req, res) => {
    const { studentId, domains } = req.body;

    if (!studentId || !domains) {
        return res.status(400).json({ message: 'Student ID and domain scores are required' });
    }

    try {
        const newAssessment = new Assessment({
            studentId,
            domains,
            createdAt: new Date(),
        });

        await newAssessment.save();
        res.status(201).json({ message: 'Assessment added successfully', assessment: newAssessment });
    } catch (error) {
        res.status(500).json({ message: 'Error adding assessment', error });
    }
};

// Get all assessments
exports.getAllAssessments = async (req, res) => {
    try {
        const assessments = await Assessment.find().populate('studentId', 'email role');
        res.status(200).json({ assessments });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving assessments', error });
    }
};

// Get assessments by student ID
exports.getAssessmentsByStudent = async (req, res) => {
    const { studentId } = req.params;

    try {
        const assessments = await Assessment.find({ studentId }).populate('studentId', 'email role');
        res.status(200).json({ assessments });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving assessments for student', error });
    }
};

// Update an assessment
exports.updateAssessment = async (req, res) => {
    const { id } = req.params;
    const { domains } = req.body;

    try {
        const updatedAssessment = await Assessment.findByIdAndUpdate(
            id,
            { domains, updatedAt: new Date() },
            { new: true }
        );

        if (!updatedAssessment) {
            return res.status(404).json({ message: 'Assessment not found' });
        }

        res.status(200).json({ message: 'Assessment updated successfully', assessment: updatedAssessment });
    } catch (error) {
        res.status(500).json({ message: 'Error updating assessment', error });
    }
};

// Delete an assessment
exports.deleteAssessment = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAssessment = await Assessment.findByIdAndDelete(id);

        if (!deletedAssessment) {
            return res.status(404).json({ message: 'Assessment not found' });
        }

        res.status(200).json({ message: 'Assessment deleted successfully', assessment: deletedAssessment });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting assessment', error });
    }
};