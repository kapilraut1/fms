import { Request, Response } from "express";
import { AppDataSource } from "../libs/utils/data-source.js";
import { FormationManagement } from "../entities/formation.js";

const formationRepo = AppDataSource.getRepository(FormationManagement);

export const createFormation = async (req: Request, res: Response) => {
  try {
    const { formation } = req.body;

    const parts = formation.split("-");

    if (parts.length < 3) {
      return res.status(400).json({
        message: "The formation should be in this format def-mid-for ",
      });
    }
    const [def, mid, forward] = parts;
    const arr = parts.map(Number);

    const sum = arr.reduce((a: number, b: number) => a + b, 0);
    if (sum !== 10) {
      return res.status(400).json({
        message: "Total sum of players should be 10 excluding keeper ",
      });
    }

    if (!def || def < 3) {
      return res
        .status(400)
        .json({ message: "Defenders should be atleast 3 in numbers" });
    }

    if (!mid || mid < 2) {
      return res
        .status(400)
        .json({ message: "Mid fielders should be atleast 2" });
    }

    if (!forward || forward < 1) {
      return res
        .status(400)
        .json({ message: "Forwards should be atleast one" });
    }

    const newformation = formationRepo.create({
      formation,
    });

    await formationRepo.save(newformation);

    return res.status(201).json({
      message: "Formation created",
      data: newformation,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteFormation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const findALL = await formationRepo.findAndCount();
    const [entities, count] = findALL;

    if (count === 1) {
      return res.status(500).json({
        message: "Only one formation is available. So, you can't delete",
      });
    }
    const findFormation = await formationRepo.findOne({
      where: { id: Number(id) },
    });
    if (!findFormation) {
      return res
        .status(404)
        .json({ message: "This formation is not available" });
    }
    await formationRepo.delete(findFormation);
    return res.status(200).json({ message: "the formation is deleted " });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// GET ALL Formations
export const getFormation = async (req: Request, res: Response) => {
  try {
    const allFormations = await formationRepo.find();
    return res.json(allFormations);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
