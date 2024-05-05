require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.SERVER_MONGODB_URI

const connectDB = async () => {
    try {
        await mongoose.connect(uri)
    } catch (error) {
        console.log("There's been a MongoDB connection error: ", error.message);
    }
}
module.exports = connectDB; 
