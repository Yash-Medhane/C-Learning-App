const { Quiz1, Quiz2, Quiz3, Quiz4, Quiz5, Quiz6, Quiz7, Quiz8, Quiz9, Quiz10, Quiz11, Quiz12, Quiz13, Quiz14, Quiz15, Quiz16, Quiz17, Quiz18, Quiz19, Quiz20 } = require("../model/questionModel");




const bquiz = async (req, res) => {
    try {
            titleData = await Quiz1.findById('6608fa576876827d88f2e1ed');
        res.render('bquiz', { title: titleData });
    } catch (error) {
        console.log(error.message);
        throw new Error("Failed to render bquiz");
    }
};

const unit1 = async(req,res)=>{
    try {
        
        res.render('unit1');

    } catch (error) {
        console.log(error.message);
    }
}
const unit2 = async(req,res)=>{
    try {
        
        res.render('unit2');

    } catch (error) {
        console.log(error.message);
    }
}
// Assuming you have imported all your quiz models into a single object called 'QuizModels'
const QuizModels = {
    quiz1: Quiz1,
    quiz2: Quiz2,
    quiz3: Quiz3,
    quiz4: Quiz4,
    quiz5: Quiz5,
    quiz6: Quiz6,
    quiz7: Quiz7,
    quiz8: Quiz8,
    quiz9: Quiz9,
    quiz10: Quiz10,
    quiz11: Quiz11,
    quiz12: Quiz12,
    quiz13: Quiz13,
    quiz14: Quiz14,
    quiz15: Quiz15,
    // Add mappings for other quizzes as needed
};

const selectQuiz = async (req, res) => {
    const quizName = req.params.quizName;

    // Check if the requested quiz exists in the QuizModels object
    const quizModel = QuizModels[quizName];

    if (!quizModel) {
        return res.status(404).json({ error: "Quiz not found" });
    }

    await getQuestionsByQuiz(req, res, quizModel);
};


const getQuestionsByQuiz = async (req, res, QuizModel) => {
    try {
        const questions = await QuizModel.find();
        res.json(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {
    bquiz,
    unit1,
    unit2,
    selectQuiz,
    getQuestionsByQuiz
}
