import { z } from "zod";
import { envSchema } from "./environment-variables";

export type EnvironmentVariablesType = z.infer<typeof envSchema>;