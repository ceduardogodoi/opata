import { ProblemDetailError } from "@/app/infra/http/errors/problem-detail.error";

export class InputValidationError extends ProblemDetailError {
  readonly #id;
  readonly fields: Record<string, string[]>;

  constructor(fieldErrors: Record<string, string[]>, instance?: string) {
    const fieldKeys = Object.keys(fieldErrors);
    if (fieldKeys.length < 1) {
      throw new RangeError("No field errors present.");
    }

    const fields = fieldKeys.join(", ");

    super(
      "https://example.com/probs/input-validation",
      "You have entered invalid input data.",
      `Input with invalid value for field(s): ${fields}`,
      instance
    );

    this.fields = fieldErrors;
    this.#id = "InputValidationError";
  }

  public get id(): string {
    return this.#id;
  }
}
