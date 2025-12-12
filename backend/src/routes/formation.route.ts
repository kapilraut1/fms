import express from "express";
import {
  getFormation,
  createFormation,
  deleteFormation,
} from "../controllers/formation.controller.js";

const Routes = express.Router();

Routes.get("/", getFormation);
Routes.post("/", createFormation);
Routes.delete("/:id", deleteFormation);

export default Routes;
