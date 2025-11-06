import { Calendar, LayoutDashboard, RefreshCw, BarChart3, Settings, LogOut, CalendarDays } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Calendar", url: "/dashboard/calendar", icon: CalendarDays },
  { title: "Marketplace", url: "/dashboard/marketplace", icon: Calendar },
  { title: "Swap Requests", url: "/dashboard/swap-requests", icon: RefreshCw },
  // { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
  // { title: "Settings", url: "/dashboard/settings", icon: BarChart3 },
];


export function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/sign-up"); // or "/signin"
  };
  return (
     <div className="w-64 min-h-screen glass-panel rounded-none border-r border-white/10 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center glow-primary">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">SlotSwapper</h1>
            <p className="text-xs text-muted-foreground">Time’s Redpath</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? "gradient-primary text-white shadow-lg glow-primary"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.title}</span>
          </NavLink>
        ))}
      </nav>

    </div>
  );
}
