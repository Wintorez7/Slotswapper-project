"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, RefreshCw, User, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "date-fns";

// ✅ Use environment-aware API base URL
const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/api/events"
    : "https://slotswapper-project-4hp6.onrender.com/api/events";

export default function Marketplace() {
  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [requestingId, setRequestingId] = useState<string | null>(null);

  // ✅ Fetch swappable slots from backend
  const fetchSwappableSlots = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // ✅ Correct endpoint
      const res = await axios.get(`${API_BASE_URL}/swappable`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSlots(res.data.slots || []);
    } catch (error: any) {
      console.error("Error fetching swappable slots:", error);
      toast.error("Failed to fetch swappable slots");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSwappableSlots();
  }, []);

  // ✅ Send Swap Request
  const handleRequestSwap = async (targetEventId: string, targetUserEmail: string) => {
    try {
      setRequestingId(targetEventId);
      const token = localStorage.getItem("token");

      const offeredEventId = prompt("Enter your event ID to offer in swap (for testing):");
      if (!offeredEventId) {
        toast.info("Swap canceled. You need to provide your event ID.");
        return;
      }

      // ✅ Use the correct swaps endpoint
      const res = await axios.post(
        `https://slotswapper-project-4hp6.onrender.com/api/swaps/request`,
        {
          targetEmail: targetUserEmail,
          targetEventId,
          offeredEventId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        toast.success(`Swap request sent successfully to ${targetUserEmail}`);
      }
    } catch (error: any) {
      console.error("Swap request failed:", error);
      toast.error(error.response?.data?.message || "Failed to send swap request");
    } finally {
      setRequestingId(null);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Marketplace
          </h1>
          <p className="text-muted-foreground text-base">
            Browse and request available swappable slots from other users.
          </p>
        </div>

        <Button
          onClick={fetchSwappableSlots}
          className="gradient-primary px-6 py-5 rounded-2xl glow-primary hover:scale-105 transition-all duration-300"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Swappable Slot Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <span className="ml-3 text-muted-foreground">
              Loading available slots...
            </span>
          </div>
        ) : slots.length === 0 ? (
          <div className="col-span-full glass-panel text-center p-12 rounded-2xl border border-white/10">
            <h2 className="text-xl text-white mb-2">
              No swappable slots found 😕
            </h2>
            <p className="text-muted-foreground">
              Check back later for more opportunities.
            </p>
          </div>
        ) : (
          slots.map((slot) => (
            <div
              key={slot._id}
              className="glass-panel border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  <span className="text-white font-semibold">
                    {slot.userId?.username || "Unknown User"}
                  </span>
                </div>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                  {slot.status}
                </span>
              </div>

              {/* Event Info */}
              <div className="space-y-2 mb-4">
                <h3 className="text-lg font-bold text-white">{slot.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(slot.startTime), "EEEE")}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {format(new Date(slot.startTime), "p")} –{" "}
                  {format(new Date(slot.endTime), "p")}
                </div>
              </div>

              {/* Action */}
              <Button
                variant="outline"
                disabled={requestingId === slot._id}
                onClick={() => handleRequestSwap(slot._id, slot.userId?.email)}
                className="border-primary text-primary hover:bg-primary hover:text-white mt-auto transition-all"
              >
                {requestingId === slot._id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Request Swap"
                )}
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
