const mongoose = require("mongoose");

//USER DATABASE SCHEMA 
const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true //remove space 
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        phone: {
            type: Number,
            required: true,
            trim: true
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }
    },
    {
        timestamp: true //Create createdAt, updatedAt
    }
);

//Create model
const User = mongoose.model("User", userSchema);
module.exports = User;