import express from "express";
import env from "./libs/env.js";
import { AppDataSource } from "./libs/utils/data-source.js";
import playerRoutes from "./routes/player.route.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/players", playerRoutes);
try {
    AppDataSource.initialize();
    console.log("DB Connected");
    app.listen(env.PORT, () => {
        console.log(`Server running on http://localhost:${env.PORT}`);
    });
}
catch (err) {
    console.error("Failed to start server:", err.message);
}
//# sourceMappingURL=index.js.map