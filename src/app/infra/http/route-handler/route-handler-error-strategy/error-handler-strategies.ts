import { DuplicateResourceErrorStrategy } from "./duplicate-resources-error-strategy/duplicate-resources-error-strategy";
import { InputValidationErrorStrategy } from "./input-validation-error-strategy/input-validation-error.strategy";
import { InvalidCredentialsErrorStrategy } from "./invalid-credentials-error-strategy/invalid-credentials-error.strategy";
import { NoResourcesFoundErrorStrategy } from "./no-resources-found-error-strategy/no-resources-found-error.strategy";
import type { RouteHandlerErrorStrategy } from "./route-handler-error-strategy.interface";

const _strategies: RouteHandlerErrorStrategy[] = [
  new InputValidationErrorStrategy(),
  new NoResourcesFoundErrorStrategy(),
  new DuplicateResourceErrorStrategy(),
  new InvalidCredentialsErrorStrategy(),
] as const;

const strategyIterator = new Map(
  _strategies.map((strategy) => [strategy.id, strategy])
).values();

const strategies = Array.from(strategyIterator);

export { strategies };
