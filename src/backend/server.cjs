import dotenv from "dotenv";
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = process.env.PORT ?? 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.static("public"));

import routes from "./routes/routes.js"
app.use("/", routes)

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/purrlockholmes', {
  useNewUrlParser: true,
  useUnifiedTopology: true}
  .then(() =>
  app.listen(PORT, () => console.log(`App server listening on port ${PORT}!`))
));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define schema and model
const { Player } = require("./playerSchema.js")

// CRUD endpoints

// This endpoint adds a new player to the database
app.post('/player', async (req, res) => {
  try {
    const { username, password } = req.body;
    const newPlayer = new Player(username, password);
    await newPlayer.save();
    res.status(201).json(newPlayer);
  } catch (error) {
    console.error('Error creating player:', error);
    res.status(500).json({ error: 'An error occurred while creating the player' });
  }
});

// This endpoint retrieves a player's data from the database
app.get('/player', async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).json({ error: 'An error occurred while fetching players' });
  }
});

// This endpoint updates out database player info with our local info (our save function)
app.put('/player/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { puzzles_completed, puzzles_unlocked, notes_unlocked } = req.body;
    const updatedPlayer = await Player.findByIdAndUpdate(id, { 
      $addToSet: { puzzles_unlocked: { $each: puzzles_unlocked } },
      $addToSet: { puzzles_completed: { $each: puzzles_completed } },
      $addToSet: { notes_unlocked: { $each: notes_unlocked } } }, 
    { new: true });
    res.json(updatedPlayer);
  } catch (error) {
    console.error('Error updating player:', error);
    res.status(500).json({ error: 'An error occurred while updating the player' });
  }
});

// This endpoint deletes our player from the database 
app.delete('/player/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Player.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting player:', error);
    res.status(500).json({ error: 'An error occurred while deleting the player' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
