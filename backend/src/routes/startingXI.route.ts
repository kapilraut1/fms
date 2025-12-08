import express from "express";
import {
  getStartingXI,
  createStartingXI,
} from "../controllers/startingXI.controller.js";

const Routes = express.Router();

Routes.get("/", getStartingXI);
Routes.post("/", createStartingXI);

export default Routes;
