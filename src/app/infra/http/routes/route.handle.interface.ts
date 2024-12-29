export interface RouteHandle {
  handle(request: Request): Promise<Response>;
}
