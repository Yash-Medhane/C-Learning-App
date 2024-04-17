const islogin = async (req, res, next) => {
    try {
        if (req.session.user_id) {
            next(); // Proceed to the next middleware or route handler
        } else {
            res.redirect('login'); // Redirect to the login page if user is not logged in
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
}

const islogout = async (req, res, next) => {
    try {
        if (!req.session.user_id) {
            next(); // Proceed to the next middleware or route handler
        } else {
            res.redirect('home'); // Redirect to home if user is already logged in
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    islogin,
    islogout
}
