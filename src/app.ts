import express from "express";
import path from "path";
import eventRoutes from "./routes/eventRoutes";
import attendeeRoutes from "./routes/attendeeRoutes";
import venueRoutes from "./routes/venueRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const port = 3000;

app.use("/login", (req, res) => {
  res.render("login");
});

app.use("/register", (req, res) => {
  res.render("register");
});

app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/attendee", attendeeRoutes);
app.use("/api/v1/venue", venueRoutes);
app.use("/api/v1/user", userRoutes);

app.use("/", (req, res) => {
  res.render("home");
});

// app.use((req, res) => {
//   res.render("notFound");
// });

app.listen(port, () => {
  console.log("Server running @", port);
});
