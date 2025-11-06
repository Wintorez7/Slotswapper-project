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
import axios from "axios";
import { format } from "date-fns";

const API_BASE_URL = "https://slotswapper-project-4hp6.onrender.com/api/events";

export function EventModal({
  open,
  onOpenChange,
  selectedDate,
  events,
  onUpdate,
  onDelete,
}: any) {
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleEdit = (event: any) => {
    setEditingEvent(event);
  };

  const handleUpdate = async () => {
    if (!editingEvent) return;
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${API_BASE_URL}/${editingEvent._id}`,
        {
          title: editingEvent.title,
          startTime: editingEvent.startTime,
          endTime: editingEvent.endTime,
          status: editingEvent.status || "BUSY",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onUpdate(res.data.event);
      toast.success("Event updated successfully!");
      setEditingEvent(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update event");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await axios.delete(`${API_BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onDelete(id);
      toast.success("Event deleted successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete event");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Handle quick status toggle (without editing mode)
  const handleStatusChange = async (event: any, newStatus: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${API_BASE_URL}/${event._id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onUpdate(res.data.event);
      toast.success(`Status changed to ${newStatus}`);
    } catch (error: any) {
      toast.error("Failed to update status");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-background border border-white/10 rounded-2xl text-white">
        <DialogHeader>
          <DialogTitle>
            Events on{" "}
            {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : ""}
          </DialogTitle>
        </DialogHeader>

        {events.length === 0 ? (
          <p className="text-muted-foreground mt-2">No events for this date.</p>
        ) : (
          <div className="space-y-3 mt-4">
            {events.map((event: any) => (
              <div
                key={event._id}
                className="p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
              >
                {editingEvent?._id === event._id ? (
                  <>
                    <Input
                      placeholder="Event Title"
                      value={editingEvent.title}
                      onChange={(e) =>
                        setEditingEvent({
                          ...editingEvent,
                          title: e.target.value,
                        })
                      }
                    />
                    <Input
                      type="datetime-local"
                      value={
                        editingEvent.startTime
                          ? new Date(editingEvent.startTime)
                              .toISOString()
                              .slice(0, 16)
                          : ""
                      }
                      onChange={(e) =>
                        setEditingEvent({
                          ...editingEvent,
                          startTime: e.target.value,
                        })
                      }
                      className="mt-2"
                    />
                    <Input
                      type="datetime-local"
                      value={
                        editingEvent.endTime
                          ? new Date(editingEvent.endTime)
                              .toISOString()
                              .slice(0, 16)
                          : ""
                      }
                      onChange={(e) =>
                        setEditingEvent({
                          ...editingEvent,
                          endTime: e.target.value,
                        })
                      }
                      className="mt-2"
                    />

                    {/* 🟢 Status Select */}
                    <div className="mt-3">
                      <label className="text-sm text-muted-foreground mb-1 block">
                        Change Status
                      </label>
                      <select
                        value={editingEvent.status || "BUSY"}
                        onChange={(e) =>
                          setEditingEvent({
                            ...editingEvent,
                            status: e.target.value,
                          })
                        }
                        className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="BUSY">Busy</option>
                        <option value="SWAPPABLE">Swappable</option>
                      </select>
                    </div>

                    <DialogFooter className="mt-3 flex gap-2 justify-end">
                      <Button
                        onClick={handleUpdate}
                        disabled={loading}
                        className="gradient-primary text-white"
                      >
                        {loading ? "Saving..." : "Save Changes"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setEditingEvent(null)}
                      >
                        Cancel
                      </Button>
                    </DialogFooter>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{event.title}</p>
                        <p className="text-sm">Copy This Event Id and past into Swap Request field </p>
                        <p className="text-[11px] text-muted-foreground font-mono mt-1 select-all">
                           <span className="text-lg">{event._id}</span>
                        </p>
                      </div>

                      {/* 🔁 Quick status toggle */}
                      <Button
                        size="sm"
                        variant="outline"
                        className={`text-xs px-2 py-1 rounded-lg ${
                          event.status === "SWAPPABLE"
                            ? "border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
                            : "border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                        }`}
                        onClick={() =>
                          handleStatusChange(
                            event,
                            event.status === "SWAPPABLE" ? "BUSY" : "SWAPPABLE"
                          )
                        }
                      >
                        {event.status === "SWAPPABLE" ? "Swappable" : "Busy"}
                      </Button>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {format(new Date(event.startTime), "p")} -{" "}
                      {format(new Date(event.endTime), "p")}
                    </p>

                    <div className="flex gap-3 mt-3">
                      <Button
                        size="sm"
                        onClick={() => handleEdit(event)}
                        className="text-xs bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white"
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(event._id)}
                        disabled={loading}
                      >
                        Delete
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
