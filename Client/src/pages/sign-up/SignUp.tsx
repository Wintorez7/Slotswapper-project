import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import AuthForm from "@/pages/auth/AuthForm";
import { toast } from "react-toastify";

// Your backend base URL (adjust if needed)
const API_BASE_URL = "https://slotswapper-project-4hp6.onrender.com/api/auth";

function SignUp() {
  const navigate = useNavigate();

  // ✅ Register user
  const handleSignup = async (email: string, password: string, agreeToTerms: boolean) => {
    try {
      if (!agreeToTerms) return alert("Please accept the Terms & Privacy Policy first!");

      const username = email.split("@")[0]; // simple default username

      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Registration failed");

      alert(data.message || "User registered successfully!");
      localStorage.setItem("token", data.accessToken || data.token);
      navigate("/sign-up");
    } catch (err: any) {
      alert(err.message);
    }
  };

  // ✅ Login user
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
      {/* Navbar at top */}
      <Navigation />

      {/* Auth form centered */}
      <div className="flex flex-1 items-center justify-center">
        <AuthForm onLogin={handleLogin} onSignup={handleSignup} />
      </div>
    </div>
  );
}

export default SignUp;
