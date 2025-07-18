import z from "zod";

import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const addEventSchema = z
  .object({
    title: z.string("title must be a string").openapi({ example: "Marriage" }),
    description: z.string("description must be a string"),
    date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid Date Format" })
      .transform((value) => new Date(value)),
    venueId: z.string("venueId must be string"),
  })
  .openapi({ description: "createEventSchema" });

export const addEventResponseSchema = z
  .object({
    message: z.string(),
    createdEvent: z.object({
      id: z.string(),
      title: z.string("title must be a string"),
      description: z.string("description must be a string"),
      date: z.string(),
      venueId: z.string("venueId must be string"),
    }),
  })
  .openapi({ description: "addEventResponseSchema" });

export const errorResponseSchema = z
  .object({
    message: z.string(),
    error: z.any(),
  })
  .openapi({ description: "errorResponseSchema" });

export const getEventsResponseSchema = z
  .array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      date: z.date(),
      createdAt: z.date(),
      updatedAt: z.date(),
      venueId: z.string(),
    })
  )
  .openapi({ description: "getEventsResponseSchema" });

export const eventParamSchema = z.object({
  id: z.string(),
});

export const invalidRequestSchema = z.object({
  message: z.string(),
});

export const updateEventRequestSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  date: z.date().optional(),
  venueId: z.string().optional(),
});

export const eventQuerySchema = z.object({
  page: z.number(),
  limit: z.number(),
});
