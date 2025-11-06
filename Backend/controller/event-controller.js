const Event = require("../model/Event");

// ✅ Create new event (slot)
const createEvent = async (req, res) => {
  try {
    const { title, startTime, endTime, status } = req.body;
    const userId = req.userInfo.userId;

    if (!title || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: "Please provide title, startTime, and endTime",
      });
    }

    const newEvent = new Event({
      title,
      startTime,
      endTime,
      status: status || "BUSY",
      userId,
    });

    await newEvent.save();

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create event",
    });
  }
};

// ✅ Get all events for logged-in user
const getMyEvents = async (req, res) => {
  try {
    const userId = req.userInfo.userId;
    const events = await Event.find({ userId }).sort({ startTime: 1 });

    return res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch events",
    });
  }
};

// ✅ Update event (edit title, time, or status)
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userInfo.userId;

    const event = await Event.findOne({ _id: id, userId });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found or unauthorized",
      });
    }

    Object.assign(event, req.body);
    await event.save();

    return res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update event",
    });
  }
};

// ✅ Delete event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userInfo.userId;

    const event = await Event.findOneAndDelete({ _id: id, userId });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete event",
    });
  }
};

// ✅ Get all swappable slots (excluding my own)
// ✅ Get all swappable slots (excluding my own)
const getSwappableSlots = async (req, res) => {
  try {
    const userId = req.userInfo?.userId; // logged-in user
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // ✅ Query all events that are SWAPPABLE and not created by current user
    const events = await Event.find({
      status: "SWAPPABLE",
      userId: { $ne: userId },
    })
      .populate("userId", "username email") // populate creator info
      .sort({ startTime: 1 }); // sort chronologically

    // ✅ Respond with consistent key name: "slots"
    return res.status(200).json({
      success: true,
      slots: events,
    });
  } catch (error) {
    console.error("Error fetching swappable slots:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch swappable slots",
    });
  }
};


module.exports = {
  createEvent,
  getMyEvents,
  updateEvent,
  deleteEvent,
  getSwappableSlots,
};
