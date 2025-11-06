const express = require("express");
const router = express.Router();
const {
  createSwapRequest,
  getSwapRequests,
  acceptSwap,
  rejectSwap,
} = require("../controller/swap-controller.js");
const verifyToken = require("../middleware/middleware.js");

//  Create a new swap request
router.post("/request", verifyToken, createSwapRequest);

//  Get all swap requests for logged-in user
router.get("/my-swaps", verifyToken, getSwapRequests);

//  Accept /  Reject swap
router.post("/accept/:id", verifyToken, acceptSwap);
router.post("/reject/:id", verifyToken, rejectSwap);

module.exports = router;
