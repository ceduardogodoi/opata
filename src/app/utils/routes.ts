export function isAuthRoute(pathname: string): boolean {
  return /^\/admin\/sign-(up|in)$/.test(pathname);
}

export function isProtectedRoute(pathname: string): boolean {
  return /^\/admin\/(?!sign-(up|in)$).+/.test(pathname);
}

export function isPublicRoute(pathname: string): boolean {
  return !isProtectedRoute(pathname);
}
