export type ErrorDataTuple<E extends Error, T> = [E, null] | [null, T];
