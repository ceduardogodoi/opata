export class EnvironmentVariablesError extends Error {
  private readonly _name: string;

  constructor() {
    super("One or more environment variables were not set correctly.");

    this._name = "EnvironmentVariablesError";
  }

  get name(): string {
    return this._name;
  }
}
