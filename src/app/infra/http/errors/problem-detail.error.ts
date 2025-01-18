export class ProblemDetailError {
  readonly type: string;
  readonly title: string;
  readonly detail: string;
  instance?: string;

  constructor(type: string, title: string, detail: string, instance?: string) {
    this.type = type;
    this.title = title;
    this.detail = detail;
    this.instance = instance;
  }

  set setInstance(instance: string) {
    this.instance = instance;
  }
}
