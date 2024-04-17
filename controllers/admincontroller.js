const users = require("../model/usermodel");
const bcrypt = require("bcrypt");

const loadLogin = async(req, res) => {
    try {
        res.render('adminlogin'); // Assuming adminlogin.ejs is located in your views directory
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
}

const verifylogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userdata = await users.findOne({ email: email });

        if (userdata) {
            const passwordMatch = await bcrypt.compare(password, userdata.password);

            if (passwordMatch) {

                if (userdata.is_admin === 0) {
                    res.render('adminlogin', { message: "Email and password are correct, but you are not an admin." });
                } else {
                    req.session.user_id = userdata._id;
                    res.render("adminhome"); // Redirect to adminhome instead of rendering adminhome directly
                }
            } else {
                res.render('adminlogin', { message: "Email or password is incorrect." });
            }
        } else {
            res.render("adminlogin", { message: "Email or password is incorrect." });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
}


const loadhome = async (req,res) =>{
    try {
        const userData = await users.findById({ _id:req.session.user_id });

        res.render('adminhome',{ admin:userData}); // Pass admin object to the adminhome view
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
}

const logout = async (req,res)=>{
    try {
        req.session.destroy();
        res.redirect('/adminlogin');
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
}
module.exports = {
    loadLogin,
    verifylogin,
    logout,
    loadhome
};
