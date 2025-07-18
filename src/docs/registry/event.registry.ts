import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

import {
  addEventResponseSchema,
  addEventSchema,
  errorResponseSchema,
  getEventsResponseSchema,
  invalidRequestSchema,
  updateEventRequestSchema,
} from "../../schema/eventSchema";

export const eventRegistry = new OpenAPIRegistry();

eventRegistry.register("createEventSchema", addEventSchema);
eventRegistry.register("addEventResponseSchema", addEventResponseSchema);
eventRegistry.register("errorResponseSchema", errorResponseSchema);
eventRegistry.register("invalidRequestSchema", invalidRequestSchema);

eventRegistry.registerPath({
  method: "post",
  path: "/api/v1/event/bookevent",
  summary: "Book Event Route",
  tags: ["Event"],
  description: "For Booking the Event need to send the Venue Id through body",
  security: [{ BearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: addEventSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Event Booked Succesfully",
      content: {
        "application/json": {
          schema: addEventResponseSchema,
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

eventRegistry.registerPath({
  method: "get",
  path: "/api/v1/event/getevents",
  tags: ["Event"],
  summary: "Get Events Route",
  description: "Get All the Event Route",
  security: [{ BearerAuth: [] }],
  responses: {
    200: {
      description: "Event Fetched Successfully",
      content: {
        "application/json": {
          schema: getEventsResponseSchema,
        },
      },
    },
    404: {
      description: "No Event Found",
      content: {
        "application/json": {
          schema: invalidRequestSchema,
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

eventRegistry.registerPath({
  method: "put",
  path: "/api/v1/event/updateevent/{id}",
  tags: ["Event"],
  summary: "Update Event",
  description: "Update event details using event ID.",
  security: [{ BearerAuth: [] }],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      description: "Event Id",
      schema: { type: "string" },
    },
  ],
  request: {
    body: {
      content: {
        "application/json": {
          schema: updateEventRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Event Updated Successfully",
      content: {
        "application/json": {
          schema: addEventResponseSchema,
        },
      },
    },
    404: {
      description: "Event Not Found",
      content: {
        "application/json": {
          schema: invalidRequestSchema,
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

eventRegistry.registerPath({
  path: "/api/v1/event/removeevent/{id}",
  method: "delete",
  tags: ["Event"],
  description: "Delete Event With Event Id",
  summary: "Delete Event Route",
  security: [{ BearerAuth: [] }],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "Event Id",
      required: true,
      schema: { type: "string" },
    },
  ],
  responses: {
    200: {
      description: "Event Deleted Successfully",
      content: {
        "application/json": {
          schema: invalidRequestSchema,
        },
      },
    },
    404: {
      description: "No Event Found with the Id",
      content: {
        "application/json": {
          schema: invalidRequestSchema,
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: errorResponseSchema,
        },
      },
    },
  },
});
