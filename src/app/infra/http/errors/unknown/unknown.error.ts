import { ProblemDetailError } from "../problem-detail.error";

export class UnknownError extends ProblemDetailError {
  readonly #id: string;
  readonly cause: unknown;

  constructor(instance: string, cause?: unknown) {
    super(
      "https://example.com/probs/unknown",
      "An unknown error has occured.",
      "An unknown error has occured in our servers. Please try again later.",
      instance
    );

    this.cause = cause;
    this.#id = "UnknownError";
  }

  public get id(): string {
    return this.#id;
  }
}
