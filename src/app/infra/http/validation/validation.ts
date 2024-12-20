import { ErrorCode } from "../errors/error-code";

export type ValidationError = {
  error: ErrorCode.VALIDATION_ERROR;
  statusCode: number;
  message: string;
  data: Record<string, string[] | undefined>;
};

export type ValidationSuccess<InferedSchema> = {
  error: undefined;
  statusCode: 201;
  data: InferedSchema;
};

export type ValidationResult<InferedSchema> =
  | ValidationError
  | ValidationSuccess<InferedSchema>;
