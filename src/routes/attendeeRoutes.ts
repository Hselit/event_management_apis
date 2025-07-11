import express from "express";
import { addAttendee, getAllAttendee } from "../controller/attendeeController";

const router = express.Router();

router.get("/getattendees", getAllAttendee);
router.post("/addattendee", addAttendee);

export default router;
