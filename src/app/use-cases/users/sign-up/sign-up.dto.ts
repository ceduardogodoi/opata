import { User } from "@/app/domain/user/entity/user";
import { z } from "zod";

export const createUserInputSchema = z.object({
  fullName: z
    .string({
      required_error: "Full name is required.",
    })
    .min(1, "Full name is required."),
  email: z
    .string({
      required_error: "Email is required.",
    })
    .email("Invalid email format."),
  username: z
    .string({
      required_error: "Username is required.",
    })
    .min(4, "Username should have a minimum of 4 characters long."),
  password: z
    .string({ required_error: "Password is required." })
    .min(4, "Password should have a minimum of 4 characters long."),
});

export type CreateUserInputDto = z.infer<typeof createUserInputSchema>;

export type CreateUserOutputDto = User;
