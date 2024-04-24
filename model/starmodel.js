const mongoose = require("mongoose");

const StarSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    quizzes: [
        {
            type: Number,
            default: 0 // Default value is 0
        }
    ]
});


module.exports = mongoose.model("Staruser",StarSchema);