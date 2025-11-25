// import {Request, Response} from 'express';
// import { AppDataSource } from '../libs/utils/data-source.ts';
// import { Player } from '../entities/player.ts';
export {};
// const repo = AppDataSource.getRepository(Player);
// export const createPlayer = async (req: Request, res: Response){
//     try{
//          const player = repo.create(req.body);
//          const result = await repo.save(player);
//          res.status(201).json(result);
//     }
//     catch(err){
//         res.status(500).json({message: "Error creating player", error: err})
//     }
// }
// export const getAll = async (req: Request, res: Response){
//     const players = await repo.find();
//     const squad = `${players.length}/22`;
//     const break= {
//         GK: players.filter(p => p.position === "Goalkeeper").length,
//         DEF: players.filter(p => p.position === "Defender").length,
//         MID: players.filter(p => p.position === "Midfielder").length,
//         FWD: players.filter(p => p.position === "Forward").length,
//     }
//     res.json({squad, break, players});
// }
// player.controller.ts
//# sourceMappingURL=playerController.js.map