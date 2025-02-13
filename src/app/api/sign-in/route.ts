import { env } from "@/app/env";
import { signInRouteHandler } from "@/app/infra/container";
import { cookies } from "next/headers";

export const POST = async (request: Request): Promise<Response> => {
  const response = await signInRouteHandler.handle(request);

  const clonedResponse = response.clone();
  const output = await clonedResponse.json();

  const cookieStore = await cookies();
  cookieStore.set("access_token", output.accessToken, {
    secure: env.NODE_ENV === "production",
    httpOnly: env.NODE_ENV === "production",
  });

  return response;
};
