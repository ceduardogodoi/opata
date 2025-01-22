import { CreateAnimalValidationErrorStrategy } from "./create-animal-validation-error-strategy/create-animal-validation-error.strategy";
import { NoResourcesFoundErrorStrategy } from "./no-resources-found-error-strategy/no-resources-found-error.strategy";
import type { RouteHandlerErrorStrategy } from "./route-handler-error-strategy.interface";

const _strategies: RouteHandlerErrorStrategy[] = [
  new CreateAnimalValidationErrorStrategy(),
  new NoResourcesFoundErrorStrategy(),
] as const;

const strategyIterator = new Map(
  _strategies.map((strategy) => [strategy.id, strategy])
).values();

const strategies = Array.from(strategyIterator);

export { strategies };
