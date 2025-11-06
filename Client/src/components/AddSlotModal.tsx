"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = "https://slotswapper-project-4hp6.onrender.com/api/events";

export function AddSlotModal({ open, onOpenChange, onSlotAdded }: any) {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddEvent = async () => {
    if (!title || !startTime || !endTime) return toast.info("Please fill all fields");

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // ✅ Convert local datetime to UTC before sending
      const localStart = new Date(startTime);
      const localEnd = new Date(endTime);
      const utcStart = new Date(localStart.getTime() - localStart.getTimezoneOffset() * 60000).toISOString();
      const utcEnd = new Date(localEnd.getTime() - localEnd.getTimezoneOffset() * 60000).toISOString();

      const res = await axios.post(
        `${API_BASE_URL}`,
        {
          title,
          startTime: utcStart,
          endTime: utcEnd,
          status: "BUSY",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      onSlotAdded(res.data.event);
      toast.success("Event added successfully!");
      setTitle("");
      setStartTime("");
      setEndTime("");
      onOpenChange(false);
    } catch (error: any) {
      console.error("Error creating event:", error);
      toast.error(error.response?.data?.message || "Failed to add event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background border border-white/10 text-white rounded-2xl">
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-3">
          <Input
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <Input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        <DialogFooter className="mt-4">
          <Button
            disabled={loading}
            onClick={handleAddEvent}
            className="gradient-primary text-white"
          >
            {loading ? "Saving..." : "Add Event"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
