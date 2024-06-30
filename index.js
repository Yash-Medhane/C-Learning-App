const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

// Middleware
app.use(bodyParser.text());
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/Project";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Connected to MongoDB");
});

// Routes
const userRoute = require("./routes/userRoute");
app.use("/", userRoute);

const adminRoute = require("./routes/adminRoute");
app.use("/adminlogin", adminRoute);

const questionRoutes = require("./routes/questionRoutes");
app.use('/quiz', questionRoutes);

const lessonRoute = require("./routes/lessonroute");
app.use("/", lessonRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
