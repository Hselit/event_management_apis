import z from "zod";

export const addEventSchema = z.object({
  title: z.string("title must be a string"),
  description: z.string("description must be a string"),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid Date Format" })
    .transform((value) => new Date(value)),
  venueId: z.string("venueId must be string"),
});

export const eventParamSchema = z.object({
  id: z.string(),
});

export const eventQuerySchema = z.object({
  page: z.number(),
  limit: z.number(),
});
