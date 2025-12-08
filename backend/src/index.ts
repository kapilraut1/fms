import express from "express";
import env from "./libs/env.js";
import cors from "cors";
import { AppDataSource } from "./libs/utils/data-source.js";
import playerRoutes from "./routes/player.route.js";
import startingXIRoutes from "./routes/startingXI.route.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/players", playerRoutes);
app.use("/startingXI", startingXIRoutes);

try {
  AppDataSource.initialize();
  console.log("DB Connected");

  app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT}`);
  });
} catch (err: any) {
  console.error("Failed to start server:", err.message);
}
