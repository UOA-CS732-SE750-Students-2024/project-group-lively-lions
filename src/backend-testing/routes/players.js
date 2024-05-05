const express = require("express");
const { Player } = require("../db/schema.js")

const router = express.Router();

router.get("/players", async (req, res) => {
    const players = await Player.find();

    return res.json(players);
});

router.get("/players/:id", async (req, res) => {
    const player = await Player.findById(req.params.id);

    if (player) return res.json(player);
    return res.sendStatus(404);
});

module.exports = router;