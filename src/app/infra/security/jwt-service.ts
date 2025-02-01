import { env } from "@/app/env";
import jwt from "jsonwebtoken";
import { z } from "zod";

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

    if (payload == null || typeof payload === "string") {
      // TODO: create a specific error
      throw new Error("Error trying to decode the token.");
    }

    const result = payloadOutputSchema.safeParse(payload);
    if (!result.success) {
      throw new Error("Invalid output.");
    }

    const data = {
      ...payload,
      ...result.data,
    };

    return data;
  }

  static isTokenExpired(token: string): boolean {
    const payload = JwtService.decode(token);

    const payloadExpirationInMs = payload.exp * 1000;
    const currentTimeInMs = Date.now();

    return currentTimeInMs > payloadExpirationInMs;
  }
}
