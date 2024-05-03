const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  puzzles_completed: {},
  puzzles_unlocked: {},
  notes_unlocked: {}
});

// Custom setter function to encode the username to hexadecimal
function encodeToHex(username) {
  // Convert the username to hexadecimal
  return Buffer.from(username, 'utf8').toString('hex');
}

// Pre-save hook to generate and set the _id based on the username
playerSchema.pre("save", function(next) {
  // First, encode username to hex 
  const username_enc = encodeToHex(this.username);

  // Pad the username with zeros to make it 24 characters long
  user_id = username_enc.padEnd(24, '0');

  // Ensure user_id is not longer than 24 characters
  if (user_id.length > 24) {
    user_id = user_id.slice(0, 24);
  }
  // Set player ID equal to encoded username for avoiding duplicate usernames
  this._id = new mongoose.Types.ObjectId(user_id);
  next();
});

const Player = mongoose.model("Player", playerSchema);

module.exports = { Player };
