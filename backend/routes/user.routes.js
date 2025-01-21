const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controllers.js");
const authMiddlewares = require("../middlewares/auth.js");
const multer = require("multer");
const { storage } = require("../config/cloudinary.config.js");
const upload = multer({ storage });


router.post("/register", upload.any(), userControllers.registerUser);

router.post("/login", userControllers.loginUser);

router.get("/me", authMiddlewares.isAuthenticatedUser, userControllers.getUserDetails)

router.get("/admin/users", authMiddlewares.isAuthenticatedUser, authMiddlewares.authorizeRoles("admin"), userControllers.getAllUser);


module.exports = router;