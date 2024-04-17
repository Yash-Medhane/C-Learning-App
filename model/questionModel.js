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

// Create models for each quiz
const Quiz1 = mongoose.model("Quiz1", quizSchema);
const Quiz2 = mongoose.model("Quiz2", quizSchema);
const Quiz3 = mongoose.model("Quiz3", quizSchema);
const Quiz4 = mongoose.model("Quiz4", quizSchema);
const Quiz5 = mongoose.model("Quiz5", quizSchema);
const Quiz6 = mongoose.model("Quiz6", quizSchema);
const Quiz7 = mongoose.model("Quiz7", quizSchema);
const Quiz8 = mongoose.model("Quiz8", quizSchema);
const Quiz9 = mongoose.model("Quiz9", quizSchema);
const Quiz10 = mongoose.model("Quiz10", quizSchema);
const Quiz11 = mongoose.model("Quiz11", quizSchema);
const Quiz12 = mongoose.model("Quiz12", quizSchema);
const Quiz13 = mongoose.model("Quiz13", quizSchema);
const Quiz14 = mongoose.model("Quiz14", quizSchema);
const Quiz15 = mongoose.model("Quiz15", quizSchema);
const Quiz16 = mongoose.model("Quiz16", quizSchema);
const Quiz17 = mongoose.model("Quiz17", quizSchema);
const Quiz18 = mongoose.model("Quiz18", quizSchema);
const Quiz19 = mongoose.model("Quiz19", quizSchema);
const Quiz20 = mongoose.model("Quiz20", quizSchema);

// Export all the quiz models
module.exports = { Quiz1, Quiz2, Quiz3, Quiz4, Quiz5, Quiz6, Quiz7, Quiz8, Quiz9, Quiz10, Quiz11, Quiz12, Quiz13, Quiz14, Quiz15, Quiz16, Quiz17, Quiz18, Quiz19, Quiz20 };
