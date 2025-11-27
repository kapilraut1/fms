import express from "express";

import {
  createPlayer,
  getPlayers,
  updatePlayer,
  deletePlayer,
  getPlayerById,
} from "../controllers/player.controller.js";

import {
  validate,
  playerSchema,
  updatePlayerSchema,
} from "../libs/validator/player.validator.js";
const Routes = express.Router();

Routes.get("/", getPlayers);
Routes.get("/:id", getPlayerById);
Routes.post("/", validate(playerSchema), createPlayer);
Routes.put("/:id", validate(updatePlayerSchema), updatePlayer);
Routes.delete("/:id", deletePlayer);

export default Routes;
