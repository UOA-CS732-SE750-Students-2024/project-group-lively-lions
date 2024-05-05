import express from "express";

const router = express.Router();

import api from "./api/index.mjs";
//const api = require("./api/index.cjs")
router.use("/api", api);

export default router;