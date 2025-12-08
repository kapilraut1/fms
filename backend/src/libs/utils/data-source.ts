import "reflect-metadata";

import { DataSource } from "typeorm";
import { Player } from "../../entities/player.js";

import env from "../env.js";
import { StartingXI } from "../../entities/startingXI.entity.js";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [Player, StartingXI],
  subscribers: [],
  migrations: [],
});
