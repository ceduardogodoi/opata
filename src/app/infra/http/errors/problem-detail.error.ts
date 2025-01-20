export class ProblemDetailError {
  readonly #id: string;

  readonly type: string;
  readonly title: string;
  readonly detail: string;
  instance?: string;

  constructor(type: string, title: string, detail: string, instance?: string) {
    this.type = type;
    this.title = title;
    this.detail = detail;
    this.instance = instance;

    this.#id = "ProblemDetailError";
  }

  public get id(): string {
    return this.#id;
  }
}
