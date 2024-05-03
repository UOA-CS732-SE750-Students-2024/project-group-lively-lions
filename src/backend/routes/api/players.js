import express from "express";
import {
    create_new_player, 
    update_player,
    delete_player,
} from "../../data_functions"

const router = express.Router();

// Create new player
router.post("/", async (req, res) => {
    const newPlayer = await create_new_player(req.body); 

    if (newPlayer) 
        return res 
            .status(201)
            .header("Location:", `api/notes/${newPlayer._id}`)
            .json(newPlayer);

    return res.sendStatus(422);
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