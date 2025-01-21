// Importing Modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");


// Data Parsing
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
    next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());


// Importing Routes
const userRoutes = require("./routes/user.routes");

app.use("/api/v1", userRoutes);


// Coonecting to Mongo DB
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Successfully connected to Mongo DB");
    } catch (error) {
        console.log("Mongo DB Connection Failed... " + error.message);
    }
}
connectDB();


// Error Handling Middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Some Error Ocurred" } = err;
    res.status(statusCode).json({
        success: false,
        message: message
    })
})


// Listening to Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is Listening on Port " + PORT);
})