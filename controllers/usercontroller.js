const users = require("../model/usermodel");
const { Quiz2 } = require("../model/questionModel");
const multer = require("multer");
const bcrypt = require("bcrypt");

const securePassword = async (password) => {
    try {
        const passhashed = await bcrypt.hash(password, 10);
        return passhashed;
    } catch (error) {
        console.log(error.message);
        throw new Error("Password hashing failed");
    }
}

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder for uploads
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});

const upload = multer({ storage: storage });

// Route handler to render registration form
const loadRegister = async (req, res) => {
    try {
        res.render('registeration');
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
}

// Route handler to insert new user into the database
const insertUser = async (req, res) => {
    try {
        const spassword = await securePassword(req.body.password); // Await the password hashing

        let img;
        let gen; // Declare img variable to store the image path
        if (req.body.gender === '1') {
            img = 'assets/boy.png'; // Path to male image
            gen = 'Male';
        } else if (req.body.gender === '2') {
            img = 'assets/girl.png'; // Path to female image
            gen = 'Female';
        } else {
            img = 'assets/profile.png'; // Default image path for other genders
            gen = 'Other';
        }

        const user = new users({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobno,
            image: img, // Assign the dynamically determined image path
            password: spassword,
            gender: gen,
            age: req.body.age,
            level: "Beginner",
            badge: "bronze",
            star:0,
            medal:0,
            trophy:0,
            position:1,
            cash:0,
            hints:0,
            is_admin: 0
        });

        const userData = await user.save();

        if (userData) {
            res.render('registeration', { message: "Your registration has been successful" });
        } else {
            res.render('registeration', { message: "Your registration has failed" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
}


const loginload = async(req,res)=>{
    try {
        
        res.render('login');

    } catch (error) {
        console.log(error.message);
    }
}

const verifylogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        // Fetching user data from the database
        const userData = await users.findOne({ email: email });

        if (userData) {
            // If user exists, compare passwords
            const passwordMatch = await bcrypt.compare(password, userData.password);

            if (passwordMatch) {
                req.session.user_id = userData._id;
                res.redirect('home1');
            } else {
                res.render('login', { message: "Email and password are incorrect!" });
            }
        } else {
            res.render('login', { message: "User does not exist!" });
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
}


const loadhome= async(req,res)=>{
    try {
        
        const userData = await users.findById({ _id:req.session.user_id });

        res.render('home1',{ user:userData });

    } catch (error) {
        console.log(error.message);
    }
}

const userlogout = async (req,res) =>{
    try {
        req.session.destroy();
        res.redirect('/');
    } catch (error) {
        console.log(error.message);
    }
}

const updateButton =  async (req, res) => {
    try {
        // Query MongoDB for the level value
        const document = await users.findOne();

        // Extract level value
        const level = document.level;

        // Send the level value as JSON response
        res.json({ level });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const position = async (req, res) => {
    try {
      const userId = req.session.user_id; // Assuming user_id is the ID of the logged-in user
      const user = await users.findById(userId, 'position');
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Send the position data as JSON
      res.json({ position: user.position });
    } catch (err) {
      console.error('Error retrieving position data', err);
      res.status(500).send('Internal Server Error');
    }
  };
 
  const updatePosition = async (req, res) => {
    try {
        const userId = req.session.user_id; // Assuming user_id is the ID of the logged-in user
        const newPosition = req.body.newPosition; // Get the new position value from the request body
        // Update the user's position in the database
        const updatedUser = await users.findByIdAndUpdate(userId, { position: newPosition }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error('Error updating position data', err);
        res.status(500).send('Internal Server Error');
    }
};

const cash = async (req, res) => {
    try {
      const userId = req.session.user_id; // Assuming user_id is the ID of the logged-in user
      const user = await users.findById(userId, 'cash');
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Send the position data as JSON
      res.json({ cash: user.cash });
    } catch (err) {
      console.error('Error retrieving cash data', err);
      res.status(500).send('Internal Server Error');
    }
  };
 
  const updateCash = async (req, res) => {
    try {
        const userId = req.session.user_id; // Assuming user_id is the ID of the logged-in user
        const user = await users.findById(userId, 'cash');
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newCash = req.body.newCash;
        let availableCash = user.cash;
        availableCash += newCash; // Update the available cash by adding the new cash
        
        // Update the user's cash in the database
        const updatedUser = await users.findByIdAndUpdate(userId, { cash: availableCash }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Respond with the updated user object
        res.json(updatedUser);
    } catch (err) {
        console.error('Error updating cash data', err);
        res.status(500).send('Internal Server Error');
    }
};

const updateLevel = async (req, res) => {
    try {
        const userId = req.session.user_id; // Assuming user_id is the ID of the logged-in user
        const newLevel = req.body.newLevel; // Get the new level value from the request body
        const newBadge = req.body.newBadge; // Get the new badge value from the request body

        const updatedUser = await users.findByIdAndUpdate(
            userId,
            { level: newLevel, badge: newBadge }, // Update both level and badge
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Respond with the updated user object
        res.json(updatedUser);
    } catch (err) {
        console.error('Error updating level data', err);
        res.status(500).send('Internal Server Error');
    }
};


const indexpage = async(req,res)=>{
    try {
        
        res.render('home');

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    loadRegister,
    insertUser,
    loginload,
    verifylogin,
    loadhome,
    userlogout,
    updateButton,
    indexpage,
    position,
    updatePosition,
    cash,
    updateCash,
    updateLevel,
    upload // Exporting multer upload middleware for routes handling file uploads
}
