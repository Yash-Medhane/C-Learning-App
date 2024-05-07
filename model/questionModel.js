const mongoose = require("mongoose");

// Define the schema for a quiz
const quizSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    }
});

// Create an array to store quiz models
const quizModels = [];

// Create models for each quiz using a loop
for (let i = 1; i <= 75; i++) {
    quizModels.push(mongoose.model(`Quiz${i}`, quizSchema));
}

// Export all the quiz models
module.exports = Object.fromEntries(quizModels.map((model, index) => [`Quiz${index + 1}`, model]));
