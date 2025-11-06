import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import AuthForm from "@/pages/auth/AuthForm";
import { toast } from "react-toastify";

const API_BASE_URL = "https://slotswapper-project-4hp6.onrender.com/api/events";

function SignIn() {
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      const username = email.split("@")[0];

      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Login failed");

      toast.success(data.message || "Login successful!", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
      localStorage.setItem("token", data.accessToken);
      navigate("/dashboard");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
      <Navigation />
      <div className="flex flex-1 items-center justify-center">
        <AuthForm onLogin={handleLogin} />
      </div>
    </div>
  );
}

export default SignIn;
