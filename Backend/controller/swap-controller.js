const SwapRequest = require("../model/SwapRequest");
const Event = require("../model/Event");
const User = require("../model/User");

// ✅ Create new swap request
const createSwapRequest = async (req, res) => {
  try {
    const requesterId = req.userInfo.userId; // Logged-in user (User A)
    const { targetEmail, targetEventId, offeredEventId } = req.body;

    console.log("🔥 SWAP REQUEST RECEIVED:", req.body);
    console.log("👤 USER:", req.userInfo);

    // Validation
    if (!targetEmail || !targetEventId || !offeredEventId) {
      return res.status(400).json({
        success: false,
        message: "Please provide targetEmail, targetEventId, and offeredEventId",
      });
    }

    // 1️⃣ Find target user by email
    const targetUser = await User.findOne({ email: targetEmail });
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: "Target user not found",
      });
    }

    // 2️⃣ Find target and offered events
    const targetEvent = await Event.findById(targetEventId);
    const offeredEvent = await Event.findById(offeredEventId);

    if (!targetEvent || !offeredEvent) {
      return res.status(404).json({
        success: false,
        message: "Invalid event IDs",
      });
    }

    // 3️⃣ Prevent self-swap (even if email belongs to same user)
    if (targetUser._id.toString() === requesterId) {
      return res.status(400).json({
        success: false,
        message: "You cannot swap with your own event",
      });
    }

    // 4️⃣ Prevent duplicate request
    const existing = await SwapRequest.findOne({
      requesterId,
      ownerId: targetUser._id,
      targetEventId,
      offeredEventId,
    });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "You have already requested this swap",
      });
    }

    // 5️⃣ Create swap request
    const swap = new SwapRequest({
      requesterId,
      ownerId: targetUser._id,
      targetEventId,
      offeredEventId,
      status: "PENDING",
    });

    await swap.save();

    return res.status(201).json({
      success: true,
      message: `Swap request sent successfully to ${targetEmail}`,
      swap,
    });
  } catch (error) {
    console.error("Error creating swap request:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create swap request",
    });
  }
  
};

// ✅ Get all swaps for logged-in user
const getSwapRequests = async (req, res) => {
  try {
    const userId = req.userInfo.userId;

    const incoming = await SwapRequest.find({ ownerId: userId })
      .populate("requesterId", "username email")
      .populate("targetEventId offeredEventId");

    const outgoing = await SwapRequest.find({ requesterId: userId })
      .populate("ownerId", "username email")
      .populate("targetEventId offeredEventId");

    return res.status(200).json({
      success: true,
      incoming,
      outgoing,
    });
  } catch (error) {
    console.error("Error fetching swap requests:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch swap requests",
    });
  }
};

// ✅ Accept swap
// ✅ Accept swap and exchange event times
const acceptSwap = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userInfo.userId;

    const swap = await SwapRequest.findById(id)
      .populate("targetEventId")
      .populate("offeredEventId");

    if (!swap)
      return res.status(404).json({
        success: false,
        message: "Swap request not found",
      });

    if (swap.ownerId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to accept this swap",
      });
    }

    // ✅ Swap event details
    const targetEvent = swap.targetEventId;
    const offeredEvent = swap.offeredEventId;

    if (!targetEvent || !offeredEvent) {
      return res.status(400).json({
        success: false,
        message: "One or both events not found",
      });
    }

    // ✅ Swap startTime and endTime between both events
    const tempStart = targetEvent.startTime;
    const tempEnd = targetEvent.endTime;

    targetEvent.startTime = offeredEvent.startTime;
    targetEvent.endTime = offeredEvent.endTime;

    offeredEvent.startTime = tempStart;
    offeredEvent.endTime = tempEnd;

    // ✅ Save updated events
    await targetEvent.save();
    await offeredEvent.save();

    // ✅ Mark swap as accepted
    swap.status = "ACCEPTED";
    await swap.save();

    return res.status(200).json({
      success: true,
      message: "Swap accepted and events exchanged successfully!",
      swap,
      updatedEvents: { targetEvent, offeredEvent },
    });
  } catch (error) {
    console.error("Error accepting swap:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to accept swap",
    });
  }
};


// ✅ Reject swap
const rejectSwap = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userInfo.userId;

    const swap = await SwapRequest.findById(id);
    if (!swap)
      return res.status(404).json({
        success: false,
        message: "Swap request not found",
      });

    if (swap.ownerId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to reject this swap",
      });
    }

    swap.status = "REJECTED";
    await swap.save();

    return res.status(200).json({
      success: true,
      message: "Swap rejected successfully",
      swap,
    });
  } catch (error) {
    console.error("Error rejecting swap:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to reject swap",
    });
  }
};

module.exports = {
  createSwapRequest,
  getSwapRequests,
  acceptSwap,
  rejectSwap,
};
