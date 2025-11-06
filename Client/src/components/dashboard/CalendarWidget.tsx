import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const days = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
const dates = [
  [null, null, null, null, 1, 2, 3],
  [4, 5, 6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22, 23, 24],
  [25, 26, 27, 28, 29, 30, null],
];

export function CalendarWidget() {
  return (
    <Card className="glass-panel border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Activity</h2>
        <div className="flex gap-2">
          <button className="p-1 hover:bg-secondary/50 rounded">
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-1 hover:bg-secondary/50 rounded">
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Mini Activity Chart */}
        <div className="h-24 flex items-end gap-1 mb-6">
          {[40, 60, 55, 70, 85, 75, 90].map((height, idx) => (
            <div
              key={idx}
              className="flex-1 rounded-t-lg gradient-primary opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="space-y-2">
          <div className="grid grid-cols-7 gap-2 text-xs text-muted-foreground">
            {days.map((day) => (
              <div key={day} className="text-center font-medium">
                {day}
              </div>
            ))}
          </div>
          
          {dates.map((week, weekIdx) => (
            <div key={weekIdx} className="grid grid-cols-7 gap-2">
              {week.map((date, dateIdx) => (
                <div
                  key={dateIdx}
                  className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-all ${
                    date === 23
                      ? "gradient-primary text-white font-bold glow-primary"
                      : date
                      ? "text-foreground hover:bg-secondary/50 cursor-pointer"
                      : "text-transparent"
                  }`}
                >
                  {date}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
