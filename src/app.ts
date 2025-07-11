import express from "express";
import eventRoutes from "./routes/eventRoutes";
import attendeeRoutes from "./routes/attendeeRoutes";
import venueRoutes from "./routes/venueRoutes";

const app = express();
app.use(express.json());
const port = 3000;

app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/attendee", attendeeRoutes);
app.use("/api/v1/venue", venueRoutes);

app.listen(port, () => {
  console.log("Server running @", port);
});
