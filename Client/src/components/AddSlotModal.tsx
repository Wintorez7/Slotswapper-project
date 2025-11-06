"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const API_BASE_URL = "https://slotswapper-project-4hp6.onrender.com/api/events";

export function AddSlotModal({ open, onOpenChange, onSlotAdded }: any) {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddSlot = async () => {
    try {
      if (!title || !startTime || !endTime) {
        return toast.error("All fields are required");
      }

      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          startTime,
          endTime,
          status: "BUSY",
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        throw new Error(data.message || "Failed to create slot");
      }

      // ✅ Notify success
      toast.success("New slot added successfully!");

      // ✅ Pass the newly created event back to parent (MyCalendar)
      if (onSlotAdded) onSlotAdded(data.event);

      // ✅ Reset fields
      setTitle("");
      setStartTime("");
      setEndTime("");

      // ✅ Close modal
      onOpenChange(false);
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-background border border-white/10 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-white">
            Add New Slot
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
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

        <DialogFooter className="mt-6">
          <Button
            onClick={handleAddSlot}
            disabled={loading}
            className="gradient-primary text-white px-6 py-2 rounded-lg"
          >
            {loading ? "Saving..." : "Save Slot"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
