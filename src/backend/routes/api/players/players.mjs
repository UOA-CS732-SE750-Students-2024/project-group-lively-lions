import express from "express";
import Player from "../../../playerSchema.mjs";

async function create_new_player(username, password) {
  const new_player = new Player(username, password);

  await new_player.save();
  return new_player;
};

async function get_profile(username, password) {
    try {
        const player = await Player.findOne({ username, password });
        if (player) {
            return res.json({body: player});
        } else {
            return res.sendStatus(404); // Player not found
        };
    } catch (error) {
        console.error("Error retrieving player data:", error);
        return res.status(500).json({ error: "An error occurred while retrieving the player data" });
    };
};

async function delete_player(player_id){
  await Player.deleteOne({_id: player_id})
};

async function update_player(player) {
  const player_update = await Player.findOneAndUpdate({_id: player._id}, player);
  return player_update !== undefined;
};

const players = express.Router();

// Create new player
players.post("/", async (req, res) => {
    const {username, password} = req.body;

    try {
        const newPlayer = await create_new_player(username, password); 

        if (newPlayer) 
            return res 
                .status(201)
                .header("Location:", `routes/api/players/${newPlayer._id}`)
                .json(newPlayer);
        return res.sendStatus(422);
    } catch (error) {
        console.error('Error creating player:', error); 
        return res.status(500).json({ error: 'An error occurred while creating the player' });
    }
});

// Retrieve player data
players.get("/:id", async (req, res) => {
    const { username, password } = req.query;   

    return await get_profile(username, password);
});

// Update the player
players.put("/:id", async (req, res) => {
    const {id} = req.params;
    const player = req.body;
    player._id = id;
    const success = await update_player(player);
    res.sendStatus(success ? 204 : 404);
});

// Delete the player
players.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await delete_player(id);
    return res.sendStatus(204);
  });

export default players;
