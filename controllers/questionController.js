const { 
    Quiz1, Quiz2, Quiz3, Quiz4, Quiz5, Quiz6, Quiz7, Quiz8, Quiz9, Quiz10,
    Quiz11, Quiz12, Quiz13, Quiz14, Quiz15, Quiz16, Quiz17, Quiz18, Quiz19, Quiz20,
    Quiz21, Quiz22, Quiz23, Quiz24, Quiz25, Quiz26, Quiz27, Quiz28, Quiz29, Quiz30,
    Quiz31, Quiz32, Quiz33, Quiz34, Quiz35, Quiz36, Quiz37, Quiz38, Quiz39, Quiz40,
    Quiz41, Quiz42, Quiz43, Quiz44, Quiz45, Quiz46, Quiz47, Quiz48, Quiz49, Quiz50,
    Quiz51, Quiz52, Quiz53, Quiz54, Quiz55, Quiz56, Quiz57, Quiz58, Quiz59, Quiz60,
    Quiz61, Quiz62, Quiz63, Quiz64, Quiz65, Quiz66, Quiz67, Quiz68, Quiz69
} = require("../model/questionModel");


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

const unit3 = async(req,res)=>{
    try {
        
        res.render('unit3');

    } catch (error) {
        console.log(error.message);
    }
}
const unit4 = async(req,res)=>{
    try {
        
        res.render('unit4');

    } catch (error) {
        console.log(error.message);
    }
}
const unit5 = async(req,res)=>{
    try {
        
        res.render('unit5');

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
    quiz16: Quiz16,
    quiz17: Quiz17,
    quiz18: Quiz18,
    quiz19: Quiz19,
    quiz20: Quiz20,
    quiz21: Quiz21,
    quiz22: Quiz22,
    quiz23: Quiz23,
    quiz24: Quiz24,
    quiz25: Quiz25,
    quiz26: Quiz26,
    quiz27: Quiz27,
    quiz28: Quiz28,
    quiz29: Quiz29,
    quiz30: Quiz30,
    quiz31: Quiz31,
    quiz32: Quiz32,
    quiz33: Quiz33,
    quiz34: Quiz34,
    quiz35: Quiz35,
    quiz36: Quiz36,
    quiz37: Quiz37,
    quiz38: Quiz38,
    quiz39: Quiz39,
    quiz40: Quiz40,
    quiz41: Quiz41,
    quiz42: Quiz42,
    quiz43: Quiz43,
    quiz44: Quiz44,
    quiz45: Quiz45,
    quiz46: Quiz46,
    quiz47: Quiz47,
    quiz48: Quiz48,
    quiz49: Quiz49,
    quiz50: Quiz50,
    quiz51: Quiz51,
    quiz52: Quiz52,
    quiz53: Quiz53,
    quiz54: Quiz54,
    quiz55: Quiz55,
    quiz56: Quiz56,
    quiz57: Quiz57,
    quiz58: Quiz58,
    quiz59: Quiz59,
    quiz60: Quiz60,
    quiz61: Quiz61,
    quiz62: Quiz62,
    quiz63: Quiz63,
    quiz64: Quiz64,
    quiz65: Quiz65,
    quiz66: Quiz66,
    quiz67: Quiz67,
    quiz68: Quiz68,
    quiz69: Quiz69,
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
    unit3,
    unit4,
    unit5,
    selectQuiz,
    getQuestionsByQuiz
}
