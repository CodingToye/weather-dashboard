import {FieldError, FieldValues, FormState} from "react-hook-form";

export function getErrorMessage<TFieldValues extends FieldValues>(
  errors: FormState<TFieldValues>["errors"],
  name: keyof TFieldValues
): string | undefined {
  const error = errors[name] as FieldError | undefined;
  return error?.message;
}
