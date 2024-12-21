import { z } from "zod";
import { ErrorCode } from "../../errors/error-code";
import type { Validation } from "../validation.interface";
import { ValidationResult, ValidationErrorOutput } from "../validation.types";

const createAnimalSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(2, "Name must have at least 2 characters"),
  age: z.number().optional(),
  history: z.string().optional(),
  observations: z.string().optional(),
});

type CreateAnimalSchema = z.infer<typeof createAnimalSchema>;

export class CreateAnimalValidation implements Validation<CreateAnimalSchema> {
  private constructor() {}

  public static create(): CreateAnimalValidation {
    return new CreateAnimalValidation();
  }

  public validate(data: unknown): ValidationResult<CreateAnimalSchema> {
    const result = createAnimalSchema.safeParse(data);

    if (!result.success) {
      return {
        error: ErrorCode.VALIDATION_ERROR,
        statusCode: 400,
        message: "Invalid input data.",
        data: result.error.flatten().fieldErrors,
      };
    }

    return {
      error: undefined,
      statusCode: 201,
      data: result.data,
    };
  }

  public present(
    input: Record<string, string[] | undefined>
  ): ValidationErrorOutput {
    return {
      error: ErrorCode.VALIDATION_ERROR,
      message: "Invalid input data.",
      data: input,
    };
  }
}
