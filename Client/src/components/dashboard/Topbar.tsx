"use client";

import { useState } from "react";
import { Menu, Sun, Moon, LogOut, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function Topbar() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success( "Logout successful!", {
            position: "top-right",
            autoClose: 2000,
            theme: "colored",
          });
    window.location.href = "/sign-up"; // redirect after logout
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-40 border-b border-border/50 backdrop-blur-md bg-background/80 flex items-center justify-between px-6 py-3"
    >
      {/* Left: Hamburger + Search */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>

        <div className="hidden md:flex items-center">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              className="pl-9 w-[250px] bg-background border-border"
            />
          </div>
        </div>
      </div>

      {/* Right: User actions */}
      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        {/* <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-slate-800" />
          )}
        </Button> */}

        {/* User avatar */}
        <Avatar className="cursor-pointer border border-border hover:shadow">
          <AvatarFallback className="bg-primary text-primary-foreground font-bold">
            M
          </AvatarFallback>
        </Avatar>

        {/* Logout button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="hidden sm:inline-flex"
        >
          <LogOut className="w-4 h-4 mr-1" /> Logout
        </Button>
      </div>
    </motion.header>
  );
}
