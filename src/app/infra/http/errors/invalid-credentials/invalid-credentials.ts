import { ProblemDetailError } from "../problem-detail.error";

export class InvalidCredentialsError extends ProblemDetailError {
  readonly #id: string;

  constructor(instance?: string) {
    super(
      "https://example.com/probs/invalid-credentials",
      "Username or password are invalid.",
      "You entered invalid credentials, please enter valid credentials.",
      instance
    );

    this.#id = "InvalidCredentialsError";
  }

  public get id(): string {
    return this.#id;
  }
}
