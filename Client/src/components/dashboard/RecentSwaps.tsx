import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const swaps = [
  { title: "Swap with John", subtitle: "Foodhiwung", status: "Pending" },
  { title: "Swap with Emily", subtitle: "Foodlaelius", status: "Pending" },
];

export function RecentSwaps() {
  return (
    <Card className="glass-panel border border-white/10 p-6">
      <h2 className="text-xl font-bold text-white mb-6">Recent Swap Requests</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground pb-2 border-b border-white/10">
          <span>Status</span>
          <span className="text-right">Action</span>
        </div>

        {swaps.map((swap, idx) => (
          <div key={idx} className="py-3 hover:bg-secondary/30 rounded-lg px-2 -mx-2 transition-colors">
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="text-white font-medium">{swap.title}</p>
                <p className="text-xs text-muted-foreground">{swap.subtitle}</p>
              </div>
              <Badge className="bg-muted text-white border-0">
                {swap.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
