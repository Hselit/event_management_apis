import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { errorResponseSchema, invalidRequestSchema } from "../../schema/eventSchema";
import { addUserResponseSchema, userSchema } from "../../schema/userSchema";

export const userRegistry = new OpenAPIRegistry();

userRegistry.register("createUserRequestSchema", userSchema);
userRegistry.register("createUserResponseSchema", addUserResponseSchema);
userRegistry.register("errorResponseSchema", errorResponseSchema);
userRegistry.register("invalidRequestSchema", invalidRequestSchema);

userRegistry.registerPath({
  path: "/api/v1/user/adduser",
  method: "post",
  summary: "Add User",
  tags: ["User"],
  description: "Add User Route",
  request: {
    body: {
      content: {
        "application/json": {
          schema: userSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "New User Created Successfully",
      content: {
        "application/json": {
          schema: addUserResponseSchema,
        },
      },
    },
    400: {
      description: "Invalid User Input",
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

userRegistry.registerPath({
  method: "post",
  path: "/api/v1/user/loginuser",
  tags: ["User"],
  description: "User Login Route",
  summary: "User Login",
  request: {
    body: {
      content: {
        "application/json": {
          schema: userSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "User Created Successfully",
      content: {
        "application/json": {
          schema: addUserResponseSchema,
        },
      },
    },
    401: {
      description: "Invalid Password",
      content: {
        "application/json": {
          schema: invalidRequestSchema,
        },
      },
    },
    404: {
      description: "User Not Found",
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
