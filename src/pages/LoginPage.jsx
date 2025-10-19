import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../api/auth/SignIn";
import { Link, useNavigate } from "react-router-dom";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Call backend signin
      const data = await signIn(email, password);

      // Save session data
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.admin.role);
      localStorage.setItem("admin_name", data.admin.adminName);
      localStorage.setItem("admin_id", data.admin.adminId);

      // Redirect to dashboard
      navigate("/admin_petowners");
    } catch (err) {
      // Show error from backend or fallback
      setError(err.response?.data?.message || err.message || "Login failed");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      {/* Left Section - Logo */}
      <div className="hidden bg-gray-100 md:flex flex-col items-center justify-center h-full">
        <div className="text-center">
          <img src="/signin-logo.png" alt="Logo" className="h-60 mx-auto" />
          <h1 className="text-2xl font-bold mt-6">VetConnect Admin Portal</h1>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="bg-sky-300 flex flex-col justify-center items-center">
        <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="text-sm">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:opacity-90"
          >
            Sign In
          </button>

          <p className="text-sm text-center mt-3 text-gray-700">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
