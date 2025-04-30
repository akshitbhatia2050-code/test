const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    domainScores: [
        {
            name: String,
            score: Number,
        },
    ],
    totalScore: Number,
    percentage: Number,
});

const Assessment = mongoose.model('Assessment', assessmentSchema);

module.exports = Assessment;