import { ProblemDetailError } from "../problem-detail.error";

export class DuplicateResourceError extends ProblemDetailError {
  readonly #id: string;

  constructor(instance?: string) {
    super(
      "https://example.com/probs/duplicate-resource",
      "Resource already exists.",
      "This resource was already registered.",
      instance
    );

    this.#id = "DuplicateResourceError";
  }

  public get id(): string {
    return this.#id;
  }
}
