import mongoose from "mongoose";
import crypto from "crypto";

const playerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  puzzles_completed: {},
  puzzles_unlocked: {},
  notes_unlocked: {}
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

export default Player;
