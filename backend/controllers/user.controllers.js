const User = require("../models/user.model");
const ErrorHandler = require("../utils/ErrorHandler");
const AsyncErrorHandler = require("../utils/AsyncErrorHandler");
const sendToken = require("../utils/JwtToken");

// checking is display name is unique
module.exports.isDisplayNameUnique = AsyncErrorHandler(async (req, res, next) => {
  let { displayName } = req.body;
  console.log(displayName)
  let isUserExists = await User.findOne({ displayName });
  if (isUserExists) {
    return next(new ErrorHandler(204, "User with this name already exists"));
  }
  res.status(200).json({
    message: "Avaialbe"
  })
});

// Register a User
module.exports.registerUser = AsyncErrorHandler(async (req, res, next) => {
  let { name, displayName, password } = req.body;
  console.log(req.files)

  let newUser = new User({
    name,
    displayName,
    password,
  })

  req.files.map((file) => {
    let { path, filename } = file;
    let object = { url: path, filename: filename };
    newUser.images.push(object);
  })
  
  const savedUser = await newUser.save();

  sendToken(savedUser, 201, res);
});

// Login User
module.exports.loginUser = AsyncErrorHandler(async (req, res, next) => {
    let { displayName, password } = req.body;
    if (!displayName || !password) {
        return next(new ErrorHandler(400, "Display name & Password is Required"));
    }

    const user = await User.findOne({ displayName }).select("+password");
    if (!user) {
        return next(new ErrorHandler(401, "Invalid Display name or Password"));
    }

    const isPasswordMatched = await user.comparePassowrd(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler(401, "Invalid Display name or Password"));
    }

    sendToken(user, 200, res);
}); 

// Get all Users => admin
module.exports.getAllUser = AsyncErrorHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get User Detail
exports.getUserDetails = AsyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});