import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");
  if (token) {
    //  Logged in → prevent access to public pages
    return <Navigate to="/dashboard" replace />;
  }
  return children; //  Not logged in → allow home/signin/signup
}
