import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", activity: 20 },
  { day: "Tue", activity: 35 },
  { day: "Wed", activity: 45 },
  { day: "Thu", activity: 38 },
  { day: "Fri", activity: 50 },
  { day: "Sat", activity: 42 },
  { day: "Sun", activity: 30 },
];

export function ActivityChart() {
  return (
    <Card className="glass-panel border border-white/10 p-6 col-span-2">
      <h2 className="text-xl font-bold text-white mb-6">Activity</h2>
      
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(260 80% 60%)" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="hsl(260 80% 60%)" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" />
          <YAxis stroke="rgba(255,255,255,0.5)" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(230 50% 12%)', 
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="activity" 
            stroke="hsl(260 80% 60%)" 
            strokeWidth={3}
            fill="url(#colorActivity)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
