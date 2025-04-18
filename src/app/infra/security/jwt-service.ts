import { env } from "@/app/env";
import jwt from "jsonwebtoken";
import { z } from "zod";

type PayloadOutput = {
  sub: string;
  username: string;
  email: string;
  exp: number;
};

type SanitizedPayload = jwt.JwtPayload & PayloadOutput;

const payloadInputSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  username: z.string(),
  email: z.string(),
});

const payloadOutputSchema = z.object({
  sub: z.string(),
  username: z.string(),
  email: z.string(),
  iat: z.number(),
  exp: z.number(),
});

export class JwtService {
  static sign(payload: unknown): string {
    const result = payloadInputSchema.safeParse(payload);
    if (!result.success) {
      throw new Error(
        "Malformed payload: Payload has different data than expected."
      );
    }

    const sanitizedPayload = {
      sub: result.data.id,
      fullName: result.data.fullName,
      username: result.data.username,
      email: result.data.email,
    };

    const token = jwt.sign(sanitizedPayload, env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return token;
  }

  static decode(token: string): SanitizedPayload {
    const payload = jwt.decode(token);

    const data = JwtService.#validatePayloadOrThrow(payload);

    return data;
  }

  static verify(token: string): PayloadOutput {
    const payload = jwt.verify(token, env.JWT_SECRET);

    const data = JwtService.#validatePayloadOrThrow(payload);

    return data;
  }

  static isTokenExpired(token: string): boolean {
    const payload = JwtService.decode(token);

    const payloadExpirationInMs = payload.exp * 1000;
    const currentTimeInMs = Date.now();

    return currentTimeInMs > payloadExpirationInMs;
  }

  static isTokenValid(token: string | undefined): token is string {
    if (token == null) {
      return false;
    }

    try {
      JwtService.decode(token);
    } catch {
      return false;
    }

    return true;
  }

  static #validatePayloadOrThrow(
    payload: string | jwt.JwtPayload | null
  ): SanitizedPayload {
    const result = payloadOutputSchema.safeParse(payload);
    if (!result.success) {
      throw new Error("Malformed payload: Payload has different data than expected.");
    }

    return result.data;
  }
}
