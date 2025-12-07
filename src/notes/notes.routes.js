const express = require("express");
const router = express.Router();

const controller = require("./notes.controller");

router.post("/", controller.create);
router.get("/:type/:id", controller.getForTarget);
router.delete("/:id", controller.delete);

module.exports = router;
