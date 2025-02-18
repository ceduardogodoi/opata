import { User } from "@/app/domain/user/entity/user";
import { z } from "zod";

export const createUserInputSchema = z.object({
  fullName: z
    .string({
      required_error: "Nome completo é obrigatório.",
    })
    .min(4, "Nome completo deve ter no mínimo 4 caracteres."),
  email: z
    .string({
      required_error: "Email é obrigatório.",
    })
    .email("Fomato de e-mail inválido."),
  username: z
    .string({
      required_error: "Usuário é obrigatório.",
    })
    .min(4, "Usuário deve ter no mínimo 4 caracteres."),
  password: z
    .string({ required_error: "Senha é obrigatória." })
    .min(4, "Senha deve ter no mínimo 4 caracteres."),
});

export type CreateUserInputDto = z.infer<typeof createUserInputSchema>;

export type CreateUserOutputDto = {
  user: User;
  accessToken: string;
};
