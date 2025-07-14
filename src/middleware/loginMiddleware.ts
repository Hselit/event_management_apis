import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticateRequest } from "../utils/common.dto";

export const verifyPassword = async (password: string, hashedPassword: string) => {
  try {
    const verifypass = await bcrypt.compare(password, hashedPassword);
    return verifypass;
  } catch (error) {
    throw error;
  }
};

export const generateToken = async (username: string, role: string) => {
  try {
    const token = jwt.sign({ username: username, role: role }, process.env.SECRET_KEY as string);
    return token;
  } catch (error) {
    throw error;
  }
};

export const ecryptPassword = async (password: string) => {
  try {
    const decryptedpass = await bcrypt.hash(password, 10);
    return decryptedpass;
  } catch (error) {
    throw error;
  }
};

export const validateToken = (
  req: AuthenticateRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      res.status(401).json({ message: "No Token Provided" });
      return;
    }

    const token = authHeader?.startsWith("Bearer") ? authHeader.slice(7) : authHeader;

    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
      if (typeof decoded == "string") {
        res.status(401).json({ message: "Invalid Token" });
        return;
      }
      req.user = decoded;
      next();
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid Token" });
    return;
  }
};

export const roleMiddleware = (allowedRoles: string[]) => {
  return (req: AuthenticateRequest, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) {
        res.status(401).json({ message: "User not Authenticated" });
        return;
      }
      if (!allowedRoles.includes(user.role)) {
        res.status(403).json({ message: "Forbidden: Insufficient Role" });
        return;
      }
      next();
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
