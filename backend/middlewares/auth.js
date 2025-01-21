const AsyncErrorHandler = require("../utils/AsyncErrorHandler");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports.isAuthenticatedUser = AsyncErrorHandler(async (req, res, next) => {
    const {token} = req.cookies;
   
    if (!token) {
        return next(new ErrorHandler(401, "Plaese Login to access this Resource"));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
});

module.exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
           return next(new ErrorHandler(403, `Role : ${req.user.role} is not allowed to access this resource`));
        }

        next();
    }
};

module.exports.isUserExists = AsyncErrorHandler(async (req, res, next) => {
    let { displayName } = req.body;
    console.log(req.body)
    
    const isUserExists = await User.findOne({ displayName: displayName });
    if (isUserExists) {
       return next(new ErrorHandler(204, "User with given display name already exists"));
    }

    next();
})