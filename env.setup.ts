import { EnvironmentVariablesError } from "@/app/domain/environment-variables/entity/environment-variables";
import { NodeEnvEnum } from "@/app/globals/enums";
import { z } from "zod";

const envSchema = z.object({
  NODE_OPTIONS: z.string().default("--require reflect-metadata"),
  NODE_ENV: z.enum([
    NodeEnvEnum.DEVELOPMENT,
    NodeEnvEnum.PRODUCTION,
    NodeEnvEnum.TEST,
  ]),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  throw new EnvironmentVariablesError();
}
