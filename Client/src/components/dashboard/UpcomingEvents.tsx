import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const events = [
  { title: "Team Meeting", day: "Tue", status: "Busy", statusColor: "bg-muted" },
  { title: "Focus Block", day: "Wed", status: "Swappable", statusColor: "bg-primary" },
  { title: "Client Call", day: "Thu", time: "4:00", status: "", statusColor: "" },
];

export function UpcomingEvents() {
  return (
    <Card className="glass-panel border border-white/10 p-6 col-span-2">
      <h2 className="text-xl font-bold text-white mb-6">Upcoming Events</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground pb-2 border-b border-white/10">
          <span>Title</span>
          <span>Event</span>
          <span>Status</span>
        </div>

        {events.map((event, idx) => (
          <div key={idx} className="grid grid-cols-3 gap-4 items-center py-3 hover:bg-secondary/30 rounded-lg px-2 -mx-2 transition-colors">
            <span className="text-white font-medium">{event.title}</span>
            <span className="text-muted-foreground">{event.day} {event.time}</span>
            {event.status && (
              <Badge className={`${event.statusColor} text-white border-0 w-fit`}>
                {event.status}
              </Badge>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
