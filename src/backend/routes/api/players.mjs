import express from "express";

import dataFunctions from "../../data_functions.mjs";

// Then you can access the functions like this:
//const { create_new_player, delete_player, update_player } = dataFunctions;

const router = express.Router();

async function create_new_player(username, password) {
    const new_player = new Player(username, password);
  
    const db = client.db(databaseName);
  
    await db.collection(collectionName).insertOne( //adds player instance to database
        new_player
    );
    return new_player;
};
  
async function delete_player(client, databaseName, collectionName, player_id){
    const db = client.db(databaseName);

    await db.collection(collectionName).deleteOne(
        { _id: player_id }
    );
};

async function update_player(player_id, puzzles_unlocked, puzzles_completed, notes_unlocked) {
    try {
        const player = await Player.findByIdAndUpdate(
        player_id, {
        $addToSet: { puzzles_unlocked: { $each: puzzles_unlocked } },
        $addToSet: { puzzles_completed: { $each: puzzles_completed } },
        $addToSet: { notes_unlocked: { $each: notes_unlocked } }},
        { new: true });
        return updatedPlayer;
    } catch (error) {
        console.error('Error updating player:', error);
        throw error; // Rethrow the error to handle it in the calling function
    };
};

// Create new player
router.post("/", async (req, res) => {
    const {username, password} = req.body;

    try {
        const newPlayer = await create_new_player(req.body); 

        if (newPlayer) 
            return res 
                .status(201)
                .header("Location:", `api/notes/${newPlayer._id}`)
                .json(newPlayer);
        return res.sendStatus(422);
    } catch (error) {
        console.error('Error creating player:', error);
        return res.status(500).json({ error: 'An error occurred while creating the player' });
    }
});

// Retrieve player data
router.get("/:id", async (req, res) => {
    const { username, password } = req.query;

    try {
        const player = await Player.findOne({ username, password }, { _id: 1 });
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

// Update the player
router.put("/:id", async (req, res) => {
    const {id} = req.params;
    const {puzzles_unlocked, puzzle_completed, notes_unlocked} = req.body;
    const success = await update_player(id, puzzles_unlocked, puzzle_completed, notes_unlocked);
    res.sendStatus(success ? 204 : 404);
});

// Delete the player
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await delete_player(id);
    return res.sendStatus(204);
  });

export default router;