export class ProblemDetailError {
  readonly type: string;
  readonly title: string;
  readonly detail: string;
  readonly instance: string;

  constructor(type: string, title: string, detail: string, instance: string) {
    this.type = type;
    this.title = title;
    this.detail = detail;
    this.instance = instance;
  }
}
