const express = require("express");
const router = express.Router();
const controller = require("../controllers/data");

router.get("/", controller.getAllParks);

module.exports = router;
