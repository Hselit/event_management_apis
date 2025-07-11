import express from "express";
import {
  bookVenueForEvent,
  deleteEvent,
  getAllEventList,
  updateEvent,
  registerAttendee,
  getEvent,
} from "../controller/eventController";

const router = express.Router();

router.get("/getevents", getAllEventList);
router.post("/bookevent", bookVenueForEvent);
router.put("/updateevent/:id", updateEvent);
router.delete("/removeevent/:id", deleteEvent);
router.post("/events/:id/attendee", registerAttendee);
router.get("/getevent/:id", getEvent);

export default router;
