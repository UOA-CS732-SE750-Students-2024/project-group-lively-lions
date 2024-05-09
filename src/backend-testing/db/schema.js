const mongoose = require("mongoose");
const crypto = require("crypto");

/* 
This file defines the schema for the player profile. Only information
that is stored for the player is their username, password, a list of 
their completed puzzles, and an object _id make from a hashed, 
hex-encoded form of the username. MongoDB always checks for duplicate
_id instances, so this prevents duplicate usernames.

This is identical to the schema used in the actual backend but this is
here because of import issues. 
*/

const playerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  completed_puzzles: {}
});

// Custom function to generate a 24-character hash of the username
function generateHash(username) {
  // Create a hash using SHA-256 algorithm
  const hash = crypto.createHash('sha256').update(username).digest('hex');
  // Take the first 24 characters of the hash
  return hash.slice(0, 24);
};

// Pre-save hook to generate and set the _id based on the hashed username
playerSchema.pre("save", function(next) {
  // Generate a hash of the username
  const hashedUsername = generateHash(this.username);
  // Set the _id field to the hashed username
  this._id = new mongoose.Types.ObjectId(hashedUsername);
  next();
});

const Player = mongoose.model("Player", playerSchema);

module.exports = { Player };
