const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://Mohmaya:mohmaya890@cluster0.mesiasx.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Connection Error:", err));

module.exports = mongoose;