import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");
  if (!token) {
    //  No token = go to login/signup
    return <Navigate to="/sign-up" replace />;
  }
  return children; //  Authorized, allow access
}
