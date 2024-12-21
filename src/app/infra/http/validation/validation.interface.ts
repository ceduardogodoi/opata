import { ValidationResult, ValidationErrorOutput } from "./validation.types";

export interface Validation<Schema> {
  validate(data: unknown): ValidationResult<Schema>;
  present(input: Record<string, string[] | undefined>): ValidationErrorOutput;
}
