import "reflect-metadata";
import "@testing-library/jest-dom/vitest";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { loadEnvFile } from "node:process";
import { container } from "tsyringe";
import { AnimalInMemoryRepository } from "@/app/infra/repositories/animal/animal-inmemory.repository";
import { UserInMemoryRepository } from "@/app/infra/repositories/user/user-inmemory.repository";

class VitestSetup {
  private constructor() {}

  static #setupDependencies(): void {
    container
      .register("AnimalRepositoryGateway", {
        useValue: AnimalInMemoryRepository.create(),
      })
      .register("UserRepositoryGateway", {
        useValue: UserInMemoryRepository.create(),
      });
  }

  public static initializeEnvironmentVariables(): void {
    const envFilePath = resolve(__dirname, ".env.test");
    if (!existsSync(envFilePath)) {
      Object.assign(process.env, {
        NODE_OPTIONS: "--require reflect-metadata",
        NODE_ENV: "test",

        VERCEL_ORG_ID: "vercel_org_id",
        VERCEL_PROJECT_ID: "vercel_project_id",
        VERCEL_TOKEN: "vercel_token",

        JWT_SECRET: "jwt_secret",

        NEXT_PUBLIC_API_URL: "http://localhost:3000/api",
      });

      return;
    }

    loadEnvFile("./.env.test");
  }

  public static init(): void {
    VitestSetup.initializeEnvironmentVariables();

    VitestSetup.#setupDependencies();
  }
}

VitestSetup.init();
