import { env } from "../env";

export const UUID_REGEX =
  /\b[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[1-5][0-9a-fA-F]{3}\-[89abAB][0-9a-fA-F]{3}\-[0-9a-fA-F]{12}\b/;

export const API_URL = new URL(env.API_URL);
