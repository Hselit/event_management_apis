import express from "express";
import { addVenue, getAllVenueList } from "../controller/venueController";

const router = express.Router();

router.get("/getvenue", getAllVenueList);
router.post("/addvenue", addVenue);

export default router;
