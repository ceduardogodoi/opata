import { ProblemDetailError } from "../problem-detail.error";

export class UnknownError extends ProblemDetailError {
  constructor() {
    super(
      "https://example.com/probs/unknown",
      "An unknown error has occured.",
      "An unknown error has occured in our servers. Please try again later."
    );
  }
}
