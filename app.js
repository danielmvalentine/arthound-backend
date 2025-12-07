const express = require("express");
const cors = require("cors");

const usersRoutes = require("./src/users/users.routes");
const collectionsRoutes = require("./src/collections/collections.routes");
const notesRoutes = require("./src/notes/notes.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Test Route
app.get("/hello", (req, res) => {
  res.send("Hello from ArtHound backend!");
});

// API routes
app.use("/api/users", usersRoutes);
app.use("/api/collections", collectionsRoutes);
app.use("/api/notes", notesRoutes);

module.exports = app;
