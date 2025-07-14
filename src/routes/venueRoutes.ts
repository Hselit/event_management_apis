import express from "express";
import { addVenue, getAllVenueList } from "../controller/venueController";
import { roleMiddleware, validateToken } from "../middleware/loginMiddleware";
import { validate } from "../middleware/validateEvent";
import { addvenueSchema } from "../schema/venueSchema";

const router = express.Router();

router.get("/getvenue", validateToken, roleMiddleware(["User"]), getAllVenueList);
router.post(
  "/addvenue",
  validateToken,
  roleMiddleware(["User"]),
  validate(addvenueSchema, "body"),
  addVenue
);

export default router;
