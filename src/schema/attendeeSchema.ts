import z from "zod";

export const attendeeSchema = z.object({
  name: z.string("name must be string"),
  email: z.string("email must be string"),
});
