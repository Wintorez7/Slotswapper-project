import { useEffect, useState } from "react";
import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  userId: string;
  username: string;
  role?: string;
  exp?: number;
}

export function DashboardHeader() {
  const [username, setUsername] = useState<string>("User");

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded: DecodedToken = jwtDecode(token);
        setUsername(decoded.username || "User");
      }
    } catch (error) {
      console.error("Invalid or expired token", error);
    }
  }, []);

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="glass-panel mt-5 p-6 mb-6 border border-white/10">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-muted-foreground">📧 SlotSwapper</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-1">
            Hi, {username} 👋
          </h1>
          <p className="text-xl text-muted-foreground">
            Here's what's happening today — {currentDate}
          </p>
        </div>

      </div>
    </header>
  );
}
