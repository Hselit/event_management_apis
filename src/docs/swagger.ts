import { OpenApiGeneratorV3, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

import { eventRegistry } from "./registry/event.registry";
import { userRegistry } from "./registry/user.registry";

const allDefinitions = [...eventRegistry.definitions, ...userRegistry.definitions];

const generator = new OpenApiGeneratorV3(allDefinitions);

export const openApiDocument = generator.generateDocument({
  openapi: "3.1.0",
  info: {
    title: "Event Management",
    version: "1.0.0",
    description: "APIs for Event Management",
  },
  servers: [{ url: "http://localhost:3000" }],
});

openApiDocument.components = {
  securitySchemes: {
    BearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
};
