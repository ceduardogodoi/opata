export class EnvironmentVariablesError extends Error {
  constructor() {
    super("One or more environment variables were not set correctly.");

    this.name = "EnvironmentVariablesError";
  }
}
