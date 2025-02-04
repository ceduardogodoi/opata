import { ProblemDetailError } from "@/app/infra/http/errors/problem-detail.error";

export class OutputValidationError extends ProblemDetailError {
  readonly #id;

  constructor(instance?: string) {
    super(
      "https://example.com/probs/output-validation",
      "Something went wrong while processing output data.",
      "The resource output is malformed or has invalid data.",
      instance
    );

    this.#id = "OutputValidationError";
  }

  public get id(): string {
    return this.#id;
  }
}
