const express = require("express");
const router = express.Router();
const birdsController = require("../controllers/birds");

router.get("/", birdsController.index);
router.get("/:id", birdsController.show);

module.exports = router;
