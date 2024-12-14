export interface Presenter<Input, Output> {
  present(entity: Input): Output;
}
