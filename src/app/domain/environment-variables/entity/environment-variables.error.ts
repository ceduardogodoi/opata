export class EnvironmentVariablesError extends Error {
  constructor() {
    super(
      `NODE_ENV: ${process.env.NODE_ENV} - One or more environment variables were not set correctly.`
    );

    this.name = "EnvironmentVariablesError";
  }
}
