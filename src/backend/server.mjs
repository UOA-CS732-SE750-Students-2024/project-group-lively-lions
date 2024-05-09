import dotenv from "dotenv";
dotenv.config();

import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import cors from "cors"

/* 
This file defines the express app & server connection that the app will
use to connect to the MongoDB player database. Defined also are the CRUD
endpoints the player can call to interact with the database. In 
development it connects to http://localhost:3000. The server URI used
to establish the mongoose connection, as well as the localhost port,
is defined in .env in root.
*/

// Initialize Express app
const app = express();
const PORT = process.env.PORT ?? 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const SERVER_URI = process.env.VITE_SERVER_MONGODB_URI;

// MongoDB connection
mongoose.connect(SERVER_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`App server listening on localhost:${PORT}`);
  })
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define schema and model
import Player from "./playerSchema.mjs"

// CRUD endpoints

// This endpoint adds a new player to the database
app.post('/player', async (req, res) => {
  try {
    const { username, password } = req.body;
    const newPlayer = new Player({username, password});
    await newPlayer.save();
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the player' });
  }
});

// This endpoint retrieves a player's data from the database
app.get('/player', async (req, res) => {
  const { username, password } = req.query;

    try {
        const player = await Player.findOne({ username, password });
        if (player) {
            return res.json(player);
        } else {
            return res.sendStatus(404); // Player not found
        }
    } catch (error) {
        console.error("Error retrieving player data:", error);
        return res.status(500).json({ error: "An error occurred while retrieving the player data" });
    }
});

// This endpoint updates out database player info with our local info (our save function)
app.put('/player', async (req, res) => {
  try {
    /* 
    There are two updates the game makes to the database:
    1) When the player decides to update their username and password
    2) When the player makes progress and their completed_puzzles get updated
    Depending on which variables are supplied in the request body, one of
    the updates will happen.
    */
    const { old_username, old_password, username, password, completed_puzzles} = req.body;

    let filter, update;

    // Check if old_username and old_password are supplied
    if (old_username && old_password) {
      // Use old_username and old_password as filter
      filter = { username: old_username, password: old_password };
      // Use username and password as update
      update = { username, password };
    } else {
      // Use username and password as filter
      filter = { username, password };
      // Use completed_puzzles as update
      update = { completed_puzzles };
    }
    // Find the player by username and password and update their information
    const updatedPlayer = await Player.findOneAndUpdate(
      filter,
      update, // Replace the entire player object with the incoming object
      { new: true }
    );
    // Return the updated player object
  } catch (error) {
    console.error('Error updating player:', error);
    res.status(500).json({ error: 'An error occurred while updating the player' });
  }
});
