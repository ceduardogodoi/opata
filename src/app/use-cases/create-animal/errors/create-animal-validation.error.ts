import { ProblemDetailError } from "@/app/domain/error/problem-detail.error";

export class CreateAnimalValidationError extends ProblemDetailError {
  readonly #fields: Record<string, string[]>;

  constructor(detail: string, fields: Record<string, string[]>) {
    const keysCount = Object.keys(fields).length;
    if (keysCount < 1) {
      throw new RangeError("No field errors present.");
    }

    super(
      "https://example.com/probs/input-validation",
      "You have entered invalid input data.",
      detail,
      "/api/animals"
    );

    this.#fields = fields;
  }

  get fields(): Record<string, string[]> {
    return this.#fields;
  }
}
