import { Animal } from "@/app/domain/animal/entity/animal";
import { DateOfBirth } from "@/app/value-objects/date-of-birth/date-of-birth";
import { z } from "zod";

export const createAnimalInputSchema = z.object({
  name: z
    .string({
      required_error: "Name is required.",
    })
    .min(1, "Name is required."),
  dateOfBirth: z.custom<string | undefined>(
    (value) => {
      if (value == null) {
        return true;
      }

      if (typeof value !== "string") {
        return false;
      }

      try {
        new DateOfBirth(value);
      } catch {
        return false;
      }

      return true;
    },
    {
      message: "Data de nascimento inválida.",
    }
  ),
  history: z.string().optional(),
  observations: z.string().optional(),
});

export type CreateAnimalInputDto = z.infer<typeof createAnimalInputSchema>;

export type CreateAnimalOutputDto = Animal;
