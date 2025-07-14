import express from "express";
import { addAttendee, exportAttendees, getAllAttendee } from "../controller/attendeeController";
import { roleMiddleware, validateToken } from "../middleware/loginMiddleware";
import { validate } from "../middleware/validateEvent";
import { attendeeSchema } from "../schema/attendeeSchema";

const router = express.Router();

router.get("/getattendees", validateToken, roleMiddleware(["User"]), getAllAttendee);
router.post("/addattendee", validateToken, roleMiddleware(["User"]), validate(attendeeSchema, "body"), addAttendee);
router.get("/export", exportAttendees);

export default router;
