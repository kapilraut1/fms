import { z } from "zod";

import logger from "./logger.js";

const envSchema = z.object({
  PORT: z.string().regex(/^\d+$/).transform(Number).default(3000),
  DB_HOST: z.string().default("localhost"),
  DB_USERNAME: z.string().default("root"),
  DB_PASSWORD: z.string().default("Kapil@1"),
  DB_PORT: z.string().regex(/^\d+$/).transform(Number).default(3306),
  DB_NAME: z.string().default("fms"),
  NODE_ENV: z.string().default("development"),
});

const envData = envSchema.safeParse(process.env);
console.log(process.env);

if (!envData.success) {
  console.log("Invalid environment variables:", envData.error.format());
  logger.error({
    message: `Invalid environment variables: ${envData.error.format()}`,
  });
  process.exit(1);
}

const env = envData.data;

export default env;
