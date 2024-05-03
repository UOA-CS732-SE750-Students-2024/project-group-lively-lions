import express from "express";

const router = express.Router();

import players from "./players.js"
router.use("/players", players)

export default router;