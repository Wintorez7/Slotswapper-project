"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  ArrowLeftRight,
  Loader2,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/api/swaps"
    : "https://slotswapper-project-4hp6.onrender.com/api/swaps";


export default function SwapRequests() {
  const [incoming, setIncoming] = useState<any[]>([]);
  const [outgoing, setOutgoing] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // ✅ Fetch swap requests from backend
  const fetchSwaps = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE_URL}/my-swaps`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIncoming(res.data.incoming || []);
      setOutgoing(res.data.outgoing || []);
    } catch (error: any) {
      console.error("Error fetching swaps:", error);
      toast.error("Failed to load swap requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSwaps();
  }, []);

  // ✅ Handle accept/reject
  const handleAction = async (id: string, action: "accept" | "reject") => {
    try {
      setActionLoading(id);
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API_BASE_URL}/${action}/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(
        `Swap ${action === "accept" ? "accepted" : "rejected"} successfully!`
      );
      fetchSwaps(); // Refresh data
    } catch (error: any) {
      console.error("Action failed:", error);
      toast.error("Failed to update swap status");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Swap Requests
          </h1>
          <p className="text-muted-foreground text-base">
            Manage incoming and outgoing swap offers from other users.
          </p>
        </div>

        <Button
          onClick={fetchSwaps}
          className="gradient-primary px-6 py-5 rounded-2xl glow-primary hover:scale-105 transition-all duration-300"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Incoming Requests */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5 text-primary" /> Incoming Requests
        </h2>
        <div className="glass-panel border border-white/10 rounded-2xl p-6 space-y-4">
          {loading ? (
            <p className="text-muted-foreground">Loading requests...</p>
          ) : incoming.length === 0 ? (
            <p className="text-muted-foreground">
              No incoming swap requests right now.
            </p>
          ) : (
            incoming.map((req) => (
              <div
                key={req._id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-white font-medium mb-1">
                    <User className="w-4 h-4 text-primary" />
                    {req.requesterId?.username || "Unknown User"}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Offered:{" "}
                    <span className="text-white">
                      {req.offeredEventId?.title}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Wants:{" "}
                    <span className="text-white">
                      {req.targetEventId?.title}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {req.status === "PENDING" ? (
                    <>
                      <Button
                        variant="outline"
                        disabled={actionLoading === req._id}
                        onClick={() => handleAction(req._id, "accept")}
                        className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
                      >
                        {actionLoading === req._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4 mr-1" /> Accept
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        disabled={actionLoading === req._id}
                        onClick={() => handleAction(req._id, "reject")}
                        className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                      >
                        <XCircle className="w-4 h-4 mr-1" /> Reject
                      </Button>
                    </>
                  ) : req.status === "ACCEPTED" ? (
                    <span className="flex items-center text-green-400">
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Accepted
                    </span>
                  ) : (
                    <span className="flex items-center text-red-400">
                      <XCircle className="w-4 h-4 mr-1" /> Rejected
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Outgoing Requests */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5 text-primary" /> Outgoing Requests
        </h2>
        <div className="glass-panel border border-white/10 rounded-2xl p-6 space-y-4">
          {loading ? (
            <p className="text-muted-foreground">Loading requests...</p>
          ) : outgoing.length === 0 ? (
            <p className="text-muted-foreground">
              No outgoing requests made yet.
            </p>
          ) : (
            outgoing.map((req) => (
              <div
                key={req._id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-white font-medium mb-1">
                    <User className="w-4 h-4 text-primary" />
                    To: {req.ownerId?.username || "Unknown User"}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You offered:{" "}
                    <span className="text-white">
                      {req.offeredEventId?.title}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    For:{" "}
                    <span className="text-white">
                      {req.targetEventId?.title}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {req.status === "ACCEPTED" && (
                    <span className="flex items-center text-green-400">
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Accepted
                    </span>
                  )}
                  {req.status === "REJECTED" && (
                    <span className="flex items-center text-red-400">
                      <XCircle className="w-4 h-4 mr-1" /> Rejected
                    </span>
                  )}
                  {req.status === "PENDING" && (
                    <span className="flex items-center text-yellow-400">
                      <Clock className="w-4 h-4 mr-1" /> Pending
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
