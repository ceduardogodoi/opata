export class EnvironmentVariablesError extends Error {
  constructor(fields: Record<string, string[]>) {
    const variables = Object.keys(fields).join(", ");

    super(
      `${process.env.NODE_ENV} - One or more environment variables were not set correctly: ${variables}`
    );

    this.name = "EnvironmentVariablesError";
  }
}
