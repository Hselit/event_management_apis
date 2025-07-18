import z from "zod";

export const attendeeSchema = z.object({
  name: z.string("name must be string").min(3),
  email: z.string("email must be string"),
});
