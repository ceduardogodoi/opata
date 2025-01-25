import {
  createAnimalRouteHandler,
  findAllAnimalsRouteHandler,
} from "@/app/infra/container";

export const POST = createAnimalRouteHandler.handle;

export const GET = findAllAnimalsRouteHandler.handle;
