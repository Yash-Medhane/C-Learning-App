const express = require("express");
const router = express();
const QuestionController = require("../controllers/questionController");
const userController = require("../controllers/usercontroller");

// Define routes for questions

router.get("/:quizName", QuestionController.selectQuiz);

module.exports = router;


