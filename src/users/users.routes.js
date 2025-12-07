const express = require("express");
const router = express.Router();

const controller = require("./users.controller");
const auth = require("../middleware/auth");
const { allowRole } = require("../middleware/roles");

// Public
router.post("/register", controller.register);
router.post("/login", controller.login);

// Private
router.get("/profile", auth, controller.getSelf);
router.put("/profile", auth, controller.updateProfile);

router.get("/profile/:id", controller.getById);

// Follow / unfollow
router.post("/follow/:id", auth, controller.follow);
router.post("/unfollow/:id", auth, controller.unfollow);

// Curator only:
router.delete("/:id", auth, allowRole("curator"), controller.deleteUser);

module.exports = router;
