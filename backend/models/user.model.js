const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your Name"],
        maxLength: [30, "Name cannot exceed 15 characters"],
        minLength: [3, "Name should have more than 3 characters"]
    },
     displayName: {
         type: String,
         unique: [true, "Display name is already taken"],
        required: [true, "Please Enter your Name"],
        maxLength: [30, "Name cannot exceed 15 characters"],
        minLength: [4, "Name should have more than 4 characters"]
    },
    password: {
        type: String,
        required: [true, "Please Enter your Password"],
        minLength: [5, "Password should have more than 5 characters"],
        select: false
    },
    // profilePic: {
    //     filename: { type: String, required: true },
    //     url: { type: String, required: true },
    // },
    role: {
        type: String,
        default: "user"
    },
    images: [
        {
            filename: { type: String, required: true },
            url: { type: String, required: true },
        }
    ]
});


// Hashing Password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    
    this.password = await bcrypt.hash(this.password, 10);
})

// Generating JWT Token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    })
}

// Comparing Password
userSchema.methods.comparePassowrd = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}


const User = mongoose.model("User", userSchema);

module.exports = User;