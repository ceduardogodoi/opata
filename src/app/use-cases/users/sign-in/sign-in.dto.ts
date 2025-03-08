import { z } from "zod";

export const signInInputSchema = z.object({
  username: z.string({
    required_error: "Usuário é obrigatório",
  }),
  password: z.string({
    required_error: "Senha é obrigatória",
  }),
});

export type SignInInputDto = z.infer<typeof signInInputSchema>;

export type SignInOutputDto = {
  accessToken: string;
};
