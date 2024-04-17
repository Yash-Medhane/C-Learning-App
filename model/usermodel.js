const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    badge: {
        type: String,
        required: true
    },
    is_admin: {
        type: Number,
        required: true
    },
    is_verified: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    star: {
        type: Number,
        required: true
    },
    medal: {
        type: Number,
        required: true
    },
    trophy: {
        type: Number,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    cash: {
        type: Number,
        required: true
    },
    hints: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("loginuser",UserSchema);