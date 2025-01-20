/**
 * Interface for defining a strategy to handle route handler errors.
 */
export interface RouteHandlerErrorStrategy {
  /**
   * Determines if the strategy can handle the given error.
   *
   * @param {unknown} error - The error to check.
   * @returns {boolean} - True if the strategy can handle the error, false otherwise.
   */
  canHandle(error: unknown): boolean;

  /**
   * Handles the given error for the specified pathname.
   *
   * @param {unknown} error - The error to handle.
   * @param {string} pathname - The pathname where the error occurred.
   * @returns {Response} - The response to be sent.
   */
  handle(error: unknown, pathname: string): Response;
}
