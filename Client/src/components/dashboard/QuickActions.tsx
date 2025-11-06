import { Card } from "@/components/ui/card";
import { Store, Send, Calendar } from "lucide-react";

const actions = [
  { title: "Browse Swap Stors", icon: Store },
  { title: "View Requests", icon: Send },
  { title: "View Calendar", icon: Calendar },
];

export function QuickActions() {
  return (
    <Card className="glass-panel border border-white/10 p-6">
      <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
      
      <div className="space-y-3">
        {actions.map((action, idx) => (
          <button
            key={idx}
            className="w-full flex items-center gap-3 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 border border-white/10 transition-all duration-300 hover:scale-105 group"
          >
            <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center group-hover:glow-accent transition-all">
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-medium">{action.title}</span>
          </button>
        ))}
      </div>
    </Card>
  );
}
