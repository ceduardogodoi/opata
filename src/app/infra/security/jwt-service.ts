import { env } from "@/app/env";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { OutputValidationError } from "../http/errors/output-validation/output-validation.error";

const payloadOutputSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  exp: z.number(),
});

type Output = z.infer<typeof payloadOutputSchema>;

type PayloadOutput = jwt.JwtPayload & Output;

export class JwtService {
  static sign(payload: object): string {
    const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: "1h" });

    return token;
  }

  static decode(token: string): PayloadOutput {
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

  static #validatePayloadOrThrow(
    payload: string | jwt.JwtPayload | null
  ): PayloadOutput {
    const result = payloadOutputSchema.safeParse(payload);
    if (payload == null || typeof payload === "string" || !result.success) {
      throw new OutputValidationError();
    }

    const data: PayloadOutput = {
      ...payload,
      ...result.data,
    };

    return data;
  }
}
