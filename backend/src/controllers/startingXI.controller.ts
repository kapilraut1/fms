import { Request, Response } from "express";
import { AppDataSource } from "../libs/utils/data-source.js";
import { StartingXI } from "../entities/startingXI.entity.js";
import { Player } from "../entities/player.js";
import { FormationManagement } from "../entities/formation.js";

const formationRepo = AppDataSource.getRepository(FormationManagement);
const startingRepo = AppDataSource.getRepository(StartingXI);

export const getStartingXI = async (req: Request, res: Response) => {
  try {
    const startingXI = await startingRepo.find({ relations: ["player"] });
    const allPlayers = await Player.find();
    const slots: Record<string, any> = {};
    startingXI.forEach((sxi) => {
      slots[sxi.position] = sxi.player ?? null;
    });
    const substitute = allPlayers.filter(
      (p) => !startingXI.some((s) => s.player && s.player.id === p.id)
    );
    const savedFormation = await formationRepo.findOne({
      where: { isSelected: true },
    });
    return res.json({
      slots,
      substitute,
      formation: savedFormation?.formation,
    });
  } catch (err) {
    console.log("Error occured at getStartingZXI");
    return res.status(302).json({ error: "Error while fetching data " });
  }
};

const playerRepo = AppDataSource.getRepository(Player);

export const createStartingXI = async (req: Request, res: Response) => {
  try {
    const { slots, formation } = req.body;

    if (!formation) {
      return res.status(400).json({ error: "Formation is required." });
    }

    // Find the formation entity
    const selectedFormation = await formationRepo.findOne({
      where: { formation: formation },
    });

    if (!selectedFormation) {
      return res.status(404).json({ error: "Formation not found." });
    }

    await formationRepo
      .createQueryBuilder()
      .update()
      .set({ isSelected: false })
      .execute();

    selectedFormation.isSelected = true;
    await formationRepo.save(selectedFormation);

    await startingRepo.clear();

    const entries = Object.entries(slots).map(([slot, playerId]) =>
      startingRepo.create({
        position: slot,
        player: { id: Number(playerId) },
      })
    );
    await startingRepo.save(entries);

    return res.json({ message: "Starting XI saved successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
