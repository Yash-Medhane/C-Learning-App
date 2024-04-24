const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const body_parser = require("body-parser");

app.use(body_parser.text());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Project", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Connected to MongoDB");
});


// Middleware
app.use(express.static(path.join(__dirname, "/public")));

// Routes
const userRoute = require("./routes/userRoute");
app.use("/", userRoute);

const adminRoute = require("./routes/adminRoute");
app.use("/adminlogin", adminRoute);

// Mount question routes
const questionRoutes = require("./routes/questionRoutes");
app.use("/", questionRoutes);

app.use('/quiz',questionRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});
