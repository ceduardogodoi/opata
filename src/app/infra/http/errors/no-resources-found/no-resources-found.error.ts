import { ProblemDetailError } from "../problem-detail.error";

export class NoResourcesFoundError extends ProblemDetailError {
  constructor() {
    super(
      "https://example.com/probs/no-resources-found",
      "No resources were found for your request.",
      "The request you made has not found any resources.",
      ""
    );
  }

  set setInstance(instance: string) {
    this.instance = instance;
  }
}
