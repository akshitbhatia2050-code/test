const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    domains: {
        motor: { type: Number, required: true },
        adl: { type: Number, required: true },
        language: { type: Number, required: true },
        readingWriting: { type: Number, required: true },
        numberTime: { type: Number, required: true },
        domesticSocial: { type: Number, required: true },
        prevocationalMoney: { type: Number, required: true },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
});

module.exports = mongoose.model('Assessment', assessmentSchema);