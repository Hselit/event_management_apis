import express from "express";
import {
  bookVenueForEvent,
  deleteEvent,
  getAllEventList,
  updateEvent,
  registerAttendee,
  getEvent,
  getEventByPage,
  getEventAttendees,
} from "../controller/eventController";
import { roleMiddleware, validateToken } from "../middleware/loginMiddleware";
import { validate } from "../middleware/validateEvent";
import { addEventSchema, eventParamSchema, eventQuerySchema } from "../schema/eventSchema";

const router = express.Router();

router.get("/getevents", validateToken, roleMiddleware(["User"]), getAllEventList);
router.get("/eventpage", validateToken, roleMiddleware(["User"]), validate(eventQuerySchema, "query"), getEventByPage);
router.post("/bookevent", validateToken, roleMiddleware(["User"]), validate(addEventSchema, "body"), bookVenueForEvent);
router.put("/updateevent/:id", validateToken, roleMiddleware(["User"]), validate(eventParamSchema, "params"), updateEvent);
router.delete("/removeevent/:id", validateToken, roleMiddleware(["User"]), validate(eventParamSchema, "params"), deleteEvent);
router.post("/events/:id/attendee", validateToken, roleMiddleware(["User"]), validate(eventParamSchema, "params"), registerAttendee);
router.get("/getevent/:id/attendees", validateToken, roleMiddleware(["User"]), validate(eventParamSchema, "params"), getEventAttendees);
router.get("/getevent/:id", validateToken, roleMiddleware(["User"]), validate(eventParamSchema, "params"), getEvent);

export default router;
