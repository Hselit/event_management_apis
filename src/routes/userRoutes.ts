import express from "express";
import { addUser, getAllUser, loginUser } from "../controller/userController";
import { roleMiddleware, validateToken } from "../middleware/loginMiddleware";
import { userSchema } from "../schema/userSchema";
import { validate } from "../middleware/validateEvent";

const router = express.Router();

router.get("/getusers", validateToken, roleMiddleware(["User"]), getAllUser);
router.post("/adduser", validate(userSchema, "body"), addUser);
router.post("/loginuser", validate(userSchema, "body"), loginUser);

export default router;
