import express from "express";
import { createPlayer, getPlayers, updatePlayer, deletePlayer, getPlayerById, } from "../controllers/player.controller.js";
const Routes = express.Router();
Routes.get("/", getPlayers);
Routes.get("/:id", getPlayerById);
Routes.post("/", createPlayer);
Routes.put("/:id", updatePlayer);
Routes.delete("/:id", deletePlayer);
export default Routes;
//# sourceMappingURL=player.route.js.map