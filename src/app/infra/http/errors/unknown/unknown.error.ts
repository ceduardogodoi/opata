import { ProblemDetailError } from "../problem-detail.error";

export class UnknownError extends ProblemDetailError {
  readonly #id: string;

  constructor(instance: string) {
    super(
      "https://example.com/probs/unknown",
      "An unknown error has occured.",
      "An unknown error has occured in our servers. Please try again later.",
      instance
    );

    this.#id = "UnknownError";
  }

  public get id(): string {
    return this.#id;
  }
}
