const express = require("express");
const router = express.Router();
const controller = require("../controllers/postsController");
const { authenticateToken } = require("../controllers/authentication");

router.get("/", controller.listPost);
router.post("/", authenticateToken, controller.createPost);
router.get("/:username", controller.showPost);
router.delete("/:id", controller.deletePostById);

module.exports = router;
