import { Request, Response } from "express";
import { AppDataSource } from "../libs/utils/data-source.js";
import { StartingXI, XIPosition } from "../entities/startingXI.entity.js";
import { Player } from "../entities/player.js";
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
    return res.json({ slots, substitute });
  } catch (err) {
    console.log("Error occured at getStartingZXI");
    throw new Error(err);
  }
};

const playerRepo = AppDataSource.getRepository(Player);

export const createStartingXI = async (req: Request, res: Response) => {
  try {
    const { slots } = req.body;

    // Must have exactly 11 slots
    if (!slots || Object.keys(slots).length !== 11) {
      return res
        .status(400)
        .json({ error: "Starting XI must contain 11 players." });
    }

    // Check for duplicate player IDs
    const playerIds = Object.values(slots);
    const duplicates = playerIds.filter((id, i) => playerIds.indexOf(id) !== i);
    if (duplicates.length > 0) {
      return res
        .status(400)
        .json({ error: "Same player cannot be selected twice." });
    }

    // Validate each slot
    for (const [slot, playerId] of Object.entries(slots)) {
      const player = await playerRepo.findOne({
        where: { id: Number(playerId) },
      });
      if (!player) {
        return res
          .status(404)
          .json({ error: `Player with ID ${playerId} not found.` });
      }

      // Slot → Position validation
      if (slot === "GK" && player.position !== "Goalkeeper")
        return res.status(400).json({ error: "GK must be a Goalkeeper." });

      if (slot.startsWith("DEF") && player.position !== "Defender")
        return res.status(400).json({ error: "DEF slots must be Defenders." });

      if (slot.startsWith("MID") && player.position !== "Midfielder")
        return res
          .status(400)
          .json({ error: "MID slots must be Midfielders." });

      if (slot.startsWith("FWD") && player.position !== "Forward")
        return res.status(400).json({ error: "FWD slots must be Forwards." });
    }

    // Clear old Starting XI
    await startingRepo.clear();

    // Save new Starting XI entries
    const entries = Object.entries(slots).map(([slot, playerId]) =>
      startingRepo.create({
        position: slot as XIPosition,
        player: { id: Number(playerId) },
      })
    );

    await startingRepo.save(entries);

    return res.json({ message: "Starting XI saved successfully!" });
  } catch (err) {
    console.error("Error in createStartingXI:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
