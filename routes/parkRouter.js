const express = require("express");
const router = express.Router();
const controller = require("../controllers/parkController");

router.get("/", controller.getAllParks);

module.exports = router;
