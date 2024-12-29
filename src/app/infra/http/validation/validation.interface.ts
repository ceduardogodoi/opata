import { ValidationResult, ValidationErrorOutput } from "./validation.types";

/**
 * Interface representing a validation mechanism.
 *
 * @template Schema - The schema type that the validation will be based on.
 */
export interface Validation<Schema> {
  /**
   * Validates the provided data against the schema.
   *
   * @param data - The data to be validated.
   * @returns A ValidationResult containing the validation results for the schema.
   */
  validate(data: unknown): ValidationResult<Schema>;

  /**
   * Presents the validation errors in a structured format.
   *
   * @param input - A record containing the validation errors, where the key is the field name and the value is an array of error messages or undefined.
   * @returns A ValidationErrorOutput containing the formatted validation errors.
   */
  present(input: Record<string, string[] | undefined>): ValidationErrorOutput;
}
