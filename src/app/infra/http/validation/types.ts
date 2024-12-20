import { ErrorCode } from "../errors/error-code";

export type ValidationError = {
  error: ErrorCode.VALIDATION_ERROR;
  statusCode: 400;
  message: string;
  data: Record<string, string[] | undefined>;
};

export type ValidationErrorOutput = {
  error: ErrorCode.VALIDATION_ERROR;
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
