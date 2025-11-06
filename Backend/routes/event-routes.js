const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/middleware.js");
const {
  createEvent,
  getMyEvents,
  updateEvent,
  deleteEvent,
  getSwappableSlots,
} = require("../controller/event-controller.js");

router.post("/", authMiddleware, createEvent);
router.get("/", authMiddleware, getMyEvents);
router.get("/swappable", authMiddleware, getSwappableSlots);
router.put("/:id", authMiddleware, updateEvent);
router.delete("/:id", authMiddleware, deleteEvent);

module.exports = router;
