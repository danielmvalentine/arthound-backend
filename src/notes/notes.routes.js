const express = require("express");
const router = express.Router();

const controller = require("./notes.controller");
const auth = require("../middleware/auth");

// Create note
router.post("/", auth, controller.create);

// Get notes for artwork/exhibition
router.get("/:type/:id", controller.getForTarget);

// Delete note (author or curator)
router.delete("/:id", auth, controller.delete);

module.exports = router;
