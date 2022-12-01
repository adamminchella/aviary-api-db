const express = require("express");
const router = express.Router();
const birdsController = require("../controllers/birds");

router.get("/", birdsController.index);
router.get("/:id", birdsController.show);
router.get("/new", birdsController.neww);
router.get("/:id/edit", birdsController.edit);
router.post("/", birdsController.create);
router.put("/:id", birdsController.update);
router.delete("/:id", birdsController.destroy);

module.exports = router;
