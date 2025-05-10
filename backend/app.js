require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // allow frontend
    credentials: true, // if you're using cookies or authorization
  })
);
app.use(express.json());
// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});
// Routes
app.use("/api/auth", authRoutes);

// Test DB connection
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

module.exports = app;
