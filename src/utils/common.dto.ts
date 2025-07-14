import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export type methodType = "body" | "params" | "query";

export interface AuthenticateRequest extends Request {
  user?: JwtPayload;
}
