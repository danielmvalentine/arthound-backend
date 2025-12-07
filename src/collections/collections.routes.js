const express = require("express");
const router = express.Router();

const controller = require("./collections.controller");
const auth = require("../middleware/auth");

// Private collection routes
router.post("/", auth, controller.create);
router.get("/mine", auth, controller.getMine);
router.put("/:id", auth, controller.update);
router.delete("/:id", auth, controller.delete);

// Public
router.get("/user/:id", controller.getByUser);

module.exports = router;
