import z from "zod";

export const userSchema = z
  .object({
    username: z.string("Username must ba string"),
    password: z.string("Password must be string"),
  })
  .openapi({ description: "createUserRequestSchema" });

export const addUserResponseSchema = z
  .object({
    username: z.string(),
    password: z.string(),
    id: z.string(),
    role: z.string(),
  })
  .openapi({ description: "createUserResponseSchema" });
