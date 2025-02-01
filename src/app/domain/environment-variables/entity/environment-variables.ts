import { EnvironmentVariablesError } from "./environment-variables.error";
import type { ErrorDataTuple } from "@/app/types/error-data-tuple.types";
import { z } from "zod";
import type { EnvironmentVariablesType } from "./environment-variables.types";

export const envSchema = z.object({
  NODE_OPTIONS: z.string().default("--require reflect-metadata"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  VERCEL_ORG_ID: z.string(),
  VERCEL_PROJECT_ID: z.string(),
  VERCEL_TOKEN: z.string(),
  JWT_SECRET: z.string(),
});

export class EnvironmentVariables {
  static #instance: EnvironmentVariables;

  constructor() {
    if (EnvironmentVariables.#instance != null) {
      throw new Error(
        "EnvironmentVariables is a singleton class. Use EnvironmentVariables.getInstance() instead."
      );
    }
  }

  public static getInstance(): EnvironmentVariables {
    if (EnvironmentVariables.#instance == null) {
      EnvironmentVariables.#instance = new EnvironmentVariables();
    }

    return EnvironmentVariables.#instance;
  }

  public validateEnv(): ErrorDataTuple<
    EnvironmentVariablesError,
    EnvironmentVariablesType
  > {
    const result = envSchema.safeParse(process.env);

    if (!result.success) {
      if (process.env.NODE_ENV === "development") {
        // TODO: switch to logger
        console.error(result.error.format());
      }

      return [new EnvironmentVariablesError(), null];
    }

    return [null, result.data];
  }
}
