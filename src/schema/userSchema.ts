import z from "zod";

export const userSchema = z.object({
  username: z.string("Username must ba string"),
  password: z.string("Password must be string"),
});
