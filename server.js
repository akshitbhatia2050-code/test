const express = require('express');
const mongoose = require('./database');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// MongoDB Schema
const UserSchema = new mongoose.Schema({
    name: String,
    dob: String,
    age: Number,
    email: String,
    phone: String,
    assessment_date: String
});

const AssessmentSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    score: Number,
    percentage: Number,
    classification: String,
    date: { type: Date, default: Date.now }
});

const User = mongoose.model("User", UserSchema);
const Assessment = mongoose.model("Assessment", AssessmentSchema);

// **Register User**
app.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.json({ message: "User Registered!", userId: newUser._id });
    } catch (error) {
        res.status(500).json({ message: "Registration Failed", error });
    }
});

// **Save Assessment Data**
app.post('/save-assessment', async (req, res) => {
    try {
        const { userId, score } = req.body;
        const percentage = (score / 20) * 100;
        let classification = percentage >= 80 ? "Normal" :
                            percentage >= 60 ? "Mild" :
                            percentage >= 40 ? "Moderate" :
                            percentage >= 20 ? "Severe" : "Profound";

        const newAssessment = new Assessment({ userId, score, percentage, classification });
        await newAssessment.save();
        res.json({ message: "Assessment Saved!", classification, percentage });
    } catch (error) {
        res.status(500).json({ message: "Error Saving Assessment", error });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});