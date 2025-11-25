import { AppDataSource } from "../libs/utils/data-source.js";
import { Player } from "../entities/player.js";
import { validate } from "class-validator";
const playerRepo = AppDataSource.getRepository(Player);
// Creating PLAYER
export const createPlayer = async (req, res) => {
    try {
        const player = playerRepo.create(req.body);
        const errors = await validate(player);
        if (errors.length > 0) {
            return res.status(400).json({ message: "Validation failed", errors });
        }
        // Squad limit
        const totalPlayers = await playerRepo.count();
        if (totalPlayers >= 22) {
            return res.status(400).json({ message: "Squad is full (Maximum is 22)" });
        }
        // Jersey number
        const existingJersey = await playerRepo.findOne({
            where: { jerseyNumber: player.jerseyNumber },
        });
        if (existingJersey) {
            return res.status(400).json({ message: "Jersey number already taken" });
        }
        // Save player
        const saved = await playerRepo.save(player);
        return res.status(201).json(saved);
    }
    catch (err) {
        return res
            .status(500)
            .json({ message: "Server error", error: err.message });
    }
};
// GET ALL PLAYERS
export const getPlayers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const [players, total] = await playerRepo.findAndCount({
            skip,
            take: limit,
            order: { id: "ASC" },
        });
        const allPlayers = await playerRepo.find();
        const breakdown = {
            GK: allPlayers.filter((p) => p.position === "Goalkeeper").length,
            DEF: allPlayers.filter((p) => p.position === "Defender").length,
            MID: allPlayers.filter((p) => p.position === "Midfielder").length,
            FWD: allPlayers.filter((p) => p.position === "Forward").length,
        };
        res.json({
            data: players,
            // meta: {
            //   total,
            //   page,
            //   limit,
            //   totalPages: Math.ceil(total / limit),
            // },
            squad: {
                current: total,
                max: 22,
                breakdown,
            },
        });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
//Get PLAYER BY ID
export const getPlayerById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const player = await playerRepo.findOne({ where: { id: Number(id) } });
        if (!player) {
            return res.status(404).json({ message: "Player not found" });
        }
        res.json(player);
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
// UPDATE PLAYER
export const updatePlayer = async (req, res) => {
    try {
        const { id } = req.params;
        const player = await playerRepo.findOne({ where: { id: Number(id) } });
        if (!player) {
            return res.status(404).json({ message: "Player not found" });
        }
        playerRepo.merge(player, req.body);
        // Validate
        const errors = await validate(player);
        if (errors.length > 0) {
            return res.status(400).json({ message: "Validation failed", errors });
        }
        // Jersey number check
        if (req.body.jerseyNumber &&
            req.body.jerseyNumber !== player.jerseyNumber) {
            const existingJersey = await playerRepo.findOne({
                where: { jerseyNumber: req.body.jerseyNumber },
            });
            if (existingJersey) {
                return res.status(400).json({ message: "Jersey number already taken" });
            }
        }
        const saved = await playerRepo.save(player);
        res.json(saved);
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
// DELETE PLAYER
export const deletePlayer = async (req, res) => {
    try {
        const { id } = req.params;
        const player = await playerRepo.findOne({ where: { id: Number(id) } });
        console.log(player);
        if (!player) {
            return res.status(404).json({ message: "Player not found" });
        }
        // if (player.isStartingXI) {
        //   return res.status(400).json({
        //     message: "Player is in Starting XI. Remove them from XI first.",
        //   });
        // }
        // Check minimum position rule
        const allPlayers = await playerRepo.find();
        const remainingPlayers = allPlayers.filter((p) => p.id !== player.id);
        const count = {
            GK: remainingPlayers.filter((p) => p.position === "Goalkeeper").length,
            DEF: remainingPlayers.filter((p) => p.position === "Defender").length,
            MID: remainingPlayers.filter((p) => p.position === "Midfielder").length,
            FWD: remainingPlayers.filter((p) => p.position === "Forward").length,
        };
        const ok = count.GK >= 1 && count.DEF >= 4 && count.MID >= 4 && count.FWD >= 2;
        if (!ok) {
            return res.status(400).json({
                message: "Cannot delete player; position minimum rules would be broken.",
                breakdown: count,
            });
        }
        await playerRepo.remove(player);
        res.json({ message: "Player removed successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
//# sourceMappingURL=player.controller.js.map