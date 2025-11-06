"use client";

import { useState, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddSlotModal } from "@/components/AddSlotModal";
import axios from "axios";
import { toast } from "react-toastify";
import { EventModal } from "@/components/EventModal";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  format,
} from "date-fns";

const API_BASE_URL = "http://localhost:3000/api/events";

export default function MyCalendar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<any[]>([]);

  // handle date click
  const handleDayClick = (day: Date) => {
    const dayEvents = events.filter((event) =>
      isSameDay(new Date(event.startTime), day)
    );
    setSelectedDate(day);
    setSelectedEvents(dayEvents);
    setIsEventModalOpen(true);
  };

  // ✅ Fetch events
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE_URL}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data.events || []);
    } catch (error: any) {
      console.error("Error fetching events:", error);
      toast.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ✅ Add new event handler
  const handleAddEvent = (newEvent: any) => {
    setEvents((prev) => [...prev, newEvent]);
  };

  // ✅ Calendar date calculations
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const today = new Date();

  return (
    <div className="p-6 bg-card rounded-2xl shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2 text-white">
          <Calendar className="w-6 h-6 text-primary" /> My Calendar
        </h2>

        <div className="flex items-center gap-3">
          <Button
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-white/10"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h3 className="text-lg font-semibold text-white">
            {format(currentMonth, "MMMM yyyy")}
          </h3>
          <Button
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-white/10"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          <Button
            className="gradient-primary text-white px-5 py-2 ml-4 rounded-xl"
            onClick={() => setIsModalOpen(true)}
          >
            + Add Event
          </Button>
        </div>

        <AddSlotModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onSlotAdded={(newEvent: any) => {
            handleAddEvent(newEvent);
            fetchEvents(); // refresh list
          }}
        />
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 text-center text-white mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="font-medium text-sm text-muted-foreground">
            {d}
          </div>
        ))}
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading events...</p>
      ) : (
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, idx) => {
            const dayEvents = events.filter(
            (event) =>
              isSameDay(new Date(event.startTime), day) &&
              isSameMonth(new Date(event.startTime), currentMonth)
          );

            return (
              <div
              key={idx}
              onClick={() => handleDayClick(day)}
              className={`cursor-pointer p-3 rounded-lg border border-white/10 min-h-[100px] transition-all ${
                !isSameMonth(day, currentMonth)
                  ? "opacity-40"
                  : "hover:bg-white/10"
              } ${isSameDay(day, today) }`}
            >
                <p className="text-sm font-semibold text-white">
                  {format(day, "d")}
                </p>

                <div className="mt-1 space-y-1">
                  {dayEvents.map((event, eIdx) => (
                    <div
                      key={eIdx}
                      className="text-xs bg-primary/20 text-primary rounded-md px-2 py-1 truncate"
                    >
                      {format(new Date(event.startTime), "p")} — {event.title}
                    </div>
                  ))}
                </div>
                
              </div>
              
            );
          })}
        </div>
      )}
      <EventModal
      open={isEventModalOpen}
      onOpenChange={setIsEventModalOpen}
      selectedDate={selectedDate}
      events={selectedEvents}
      onUpdate={(updatedEvent: any) => {
        // ✅ Update state instantly after edit
        setEvents((prev) =>
          prev.map((e) => (e._id === updatedEvent._id ? updatedEvent : e))
        );
        fetchEvents(); // optional re-fetch from backend
      }}
      onDelete={(id: string) => {
        // ✅ Remove deleted event from state instantly
        setEvents((prev) => prev.filter((e) => e._id !== id));
      }}
    />

    </div>
    
  );
  
  
}
