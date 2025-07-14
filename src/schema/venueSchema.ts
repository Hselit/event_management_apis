import z from "zod";

export const addvenueSchema = z.object({
  name: z.string("Name must be String"),
  capacity: z.number("Capacity must be Number"),
  address: z.string("Address must be String"),
});
