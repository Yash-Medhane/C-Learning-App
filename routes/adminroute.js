const express = require("express");
const session = require("express-session");
const path = require("path");
const adminRoute = express();
const auth = require("../middleware/adminauth");

const config = require("../config/config");

adminRoute.use(session({ secret: config.sessionSecret, resave: true, saveUninitialized: true })); // Add options to session middleware

adminRoute.set('view engine', 'ejs');
adminRoute.set('views', './views/admin');


const bodyParser = require("body-parser");
adminRoute.use(bodyParser.json());
adminRoute.use(bodyParser.urlencoded({ extended: true }));

adminRoute.use(express.static('public'));
adminRoute.use(express.static(path.join(__dirname, 'views')));

const adminController = require("../controllers/admincontroller");

adminRoute.get("/", auth.isadminlogout,adminController.loadLogin);


adminRoute.post('/',adminController.verifylogin);

adminRoute.get("/adminhome",auth.isadminlogin,adminController.loadhome);

adminRoute.get('/adminlogin',auth.isadminlogin,adminController.logout);

adminRoute.get("*", function(req, res) {
    res.redirect('adminlogin'); // Redirect to the login page for admin
});

module.exports = adminRoute;
