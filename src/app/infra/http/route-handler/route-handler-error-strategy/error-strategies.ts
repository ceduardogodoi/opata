import { CreateAnimalValidationErrorStrategy } from "./create-animal-validation-error-strategy/create-animal-validation-error.strategy";
import { NoResourcesFoundErrorStrategy } from "./no-resources-found-error-strategy/no-resources-found-error.strategy";
import type { RouteHandlerErrorStrategy } from "./route-handler-error-strategy.interface";

const strategies: RouteHandlerErrorStrategy[] = [
  new CreateAnimalValidationErrorStrategy(),
  new NoResourcesFoundErrorStrategy(),
] as const;

export const errorStrategies = Array.from(new Set(strategies));
