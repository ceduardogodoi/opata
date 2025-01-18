import { ProblemDetailError } from "@/app/infra/http/errors/problem-detail.error";

export class CreateAnimalValidationError extends ProblemDetailError {
  readonly fields: Record<string, string[]>;

  constructor(fieldErrors: Record<string, string[]>) {
    const fieldKeys = Object.keys(fieldErrors);
    if (fieldKeys.length < 1) {
      throw new RangeError("No field errors present.");
    }

    const fields = fieldKeys.join(", ");

    super(
      "https://example.com/probs/input-validation",
      "You have entered invalid input data.",
      `Input with invalid value for field(s): ${fields}`,
      "/api/animals"
    );

    this.fields = fieldErrors;
  }
}
