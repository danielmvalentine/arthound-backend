const express = require("express");
const router = express.Router();

const controller = require("./collections.controller");

router.post("/", controller.create);
router.get("/mine", controller.getMine);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
