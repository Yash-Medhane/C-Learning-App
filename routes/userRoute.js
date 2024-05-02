const express = require("express");
const body_parser = require("body-parser");
const session = require("express-session");
const config = require("../config/config");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

const user_route = express(); // Define user_route here

user_route.use(session({ secret: config.sessionSecret }));

user_route.set('view engine', 'ejs');
user_route.set('views', './views/users');

user_route.use(express.static(path.join(__dirname, 'views')));

user_route.use(body_parser.json());
user_route.use(body_parser.urlencoded({ extended: true }));

user_route.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/userimages'));
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const upload = multer({ storage: storage });

const userController = require("../controllers/usercontroller");
const questionController = require("../controllers/questionController");

user_route.get('/register', auth.islogout, userController.loadRegister);
user_route.post('/register', upload.single('image'), userController.insertUser);
user_route.get('/', auth.islogout, userController.indexpage);
user_route.get('/login', auth.islogout, userController.loginload);
user_route.post('/login', userController.verifylogin);
user_route.get('/home1', auth.islogin, userController.loadhome);
user_route.get("/logout",auth.islogin,userController.userlogout);
user_route.get('/get-level',userController.updateButton);
user_route.get('/bquiz', questionController.bquiz);
user_route.get('/unit1', questionController.unit1);
user_route.get('/unit2', questionController.unit2);
user_route.get('/unit2', questionController.unit2);
user_route.get('/position',userController.position);
user_route.get('/hint',userController.hint);
user_route.post('/updatePosition',userController.updatePosition);
user_route.get('/cash',userController.cash);
user_route.get('/diamond',userController.diamond);
user_route.post('/updateCash',userController.updateCash);
user_route.post('/updateDiamond',userController.updateDiamond);
user_route.post('/updateHints',userController.updateHints);
user_route.post('/updateLevel',userController.updateLevel);
user_route.post('/updateQuiz',userController.updateQuiz);
user_route.get('/fetchQuizValue/:quizName',userController.getQuizValue);
user_route.get('/TicTacToe',userController.tictactoe);
user_route.get('/StonePaperScissor',userController.stonePaperScissor);
user_route.get('/guessTheNumber',userController.guessTheNumber);
user_route.post('/updateNewCash',userController.updateNewCash);
module.exports = user_route;
