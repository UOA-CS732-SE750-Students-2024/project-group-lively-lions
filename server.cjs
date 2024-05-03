const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const DataModel = require("./dataModel.cjs");
const connectDB = require("./database.cjs");
connectDB();

const app = express();
app.use(express.json({ extended: false }));

const cors = require("cors");
const { prototype } = require("module");
app.use(cors());

app.get("/readfromserver", (req, res) => {
    res.json({message: "Ping from server"});
});

app.post("/writefromdatabase", async (req, res) => {
    try {
        const {content} = req.body;
        const newData = new DataModel({ content });
        await newData.save();
        res.json({message: "Data successfully saved to MongoDB"})
    } catch (error) {
        console.log("Encountered an error writing to server: ", error.message);
        res.status(500).send("Server error while saving data")  
    }
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
});
