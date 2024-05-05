import express from "express";

const api = express.Router();

import players from "./players.mjs"
api.use("/players", players)

export default api;