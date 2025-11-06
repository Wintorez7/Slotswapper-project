import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, RefreshCw, CheckCircle2, Clock } from "lucide-react";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { RecentSwaps } from "@/components/dashboard/RecentSwaps";
import { CalendarWidget } from "@/components/dashboard/CalendarWidget";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ActivityStatus } from "@/components/dashboard/ActivityStatus";
import { AddSlotModal } from "@/components/AddSlotModal";
import { useState } from "react";

export default function DashboardHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header + Add Slot Button */}
      <div className="animate-fade-in">
        <DashboardHeader />
        {/* <Button
          onClick={() => setIsModalOpen(true)}
          className="gradient-primary px-5 py-6 text-lg rounded-2xl glow-primary hover:scale-105 transition-all duration-300"
        >
          <Plus className="w-6 h-6 mr-2" />
          Add New Slot
        </Button> */}
        <AddSlotModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onSlotAdded={() => console.log("slot added")}
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
        <StatCard
          title="Total Events"
          value="12"
          icon={Calendar}
          gradient="from-primary to-purple-600"
        />
        <StatCard
          title="Swappable Slots"
          value="5"
          icon={RefreshCw}
          gradient="from-accent to-blue-600"
        />
        <StatCard
          title="Pending Swaps"
          value="2"
          icon={Clock}
          gradient="from-yellow-500 to-orange-500"
        />
        <StatCard
          title="Completed Swaps"
          value="8"
          icon={CheckCircle2}
          gradient="from-green-500 to-emerald-600"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
        <div className="lg:col-span-2 space-y-6">
          <UpcomingEvents />
          <ActivityChart />
        </div>
        <div className="space-y-6">
          <RecentSwaps />
          <CalendarWidget />
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
        <QuickActions />
        <ActivityStatus />
      </div>
    </div>
  );
}