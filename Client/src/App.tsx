import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import PublicRoute from "@/components/PublicRoute";

import Index from "./pages/Index";
import SignUp from "./pages/sign-up/SignUp";
import SignIn from "./pages/sign-in/SignIn";
import DashboardLayout from "./pages/dashboard/DashboardLayout";

import NotFound from "./pages/NotFound";
import MyCalendar from "./pages/dashboard/MyCalendar";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Marketplace from "./pages/dashboard/Marketplace";
import SwapRequests from "./pages/dashboard/SwapRequests";
import Settings from "./pages/dashboard/Settings";
import Analytics from "./components/dashboard/Analytics";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔓 Public Routes */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Index />
            </PublicRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path="/sign-in"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />

        {/* 🔒 Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />{" "}
          {/* Make sure this exists */}
          <Route path="calendar" element={<MyCalendar />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="swap-requests" element={<SwapRequests />} />
          <Route path="settings" element={<Settings/>} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
