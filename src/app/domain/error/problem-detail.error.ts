export class ProblemDetailError {
  readonly #type: string;
  readonly #title: string;
  readonly #detail: string;
  readonly #instance: string;

  constructor(type: string, title: string, detail: string, instance: string) {
    this.#type = type;
    this.#title = title;
    this.#detail = detail;
    this.#instance = instance;
  }

  get type(): string {
    return this.#type;
  }

  get title(): string {
    return this.#title;
  }

  get detail(): string {
    return this.#detail;
  }

  get instance(): string {
    return this.#instance;
  }
}
