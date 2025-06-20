import { ZodError } from "zod";

export const formatErrorsZod = (error: ZodError) => {
  return error.errors.reduce((prev, cur) => {
    const field = cur.path.join(".");
    prev[field] = cur.message;
    return prev;
  }, {} as Record<string, string>);
};
