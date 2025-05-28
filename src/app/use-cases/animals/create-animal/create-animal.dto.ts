import { Animal } from "@/app/domain/animal/entity/animal";
import { z } from "zod";

export const createAnimalInputSchema = z.object({
  name: z
    .string({
      required_error: "Name is required.",
    })
    .min(1, "Name is required."),
  age: z.string().optional(),
  history: z.string().optional(),
  observations: z.string().optional(),
});

export type CreateAnimalInputDto = z.infer<typeof createAnimalInputSchema>;

export type CreateAnimalOutputDto = Animal;
