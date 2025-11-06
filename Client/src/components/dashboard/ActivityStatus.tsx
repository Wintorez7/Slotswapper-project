import { Card } from "@/components/ui/card";
import { Search, Send } from "lucide-react";

const statuses = [
  { label: "Pending", icon: Search, count: 2 },
  { label: "Completed", icon: Send, count: 5 },
];

export function ActivityStatus() {
  return (
    <Card className="glass-panel border border-white/10 p-6">
      <h2 className="text-xl font-bold text-white mb-6">Activity</h2>
      
      <div className="space-y-4">
        {statuses.map((status, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-white/10"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <status.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">{status.label}</p>
            </div>
            <span className="text-2xl font-bold text-white">{status.count}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
