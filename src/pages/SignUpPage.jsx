import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// ✅ Register admin function
const registerAdmin = async (adminData) => {
  const response = await axios.post(
    "http://localhost:5000/api/admin/signup",
    adminData
  );
  return response.data; // { admin, token, message }
};

export default function SignUpPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [adminName, setAdminName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [address, setAddress] = useState({
    street: "",
    city: "",
    province: "",
    postal_code: "",
    country: "",
    unit_number: "",
    latitude: "",
    longitude: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);

    const adminData = { adminName, email, password, phoneNumber, address };

    try {
      const result = await registerAdmin(adminData);

      if (result.admin && result.token) {
        // ✅ Save JWT token and admin info
        localStorage.setItem("token", result.token);
        localStorage.setItem("admin_name", result.admin.adminName);
        localStorage.setItem("admin_id", result.admin.adminId);
        localStorage.setItem("role", result.admin.role);

        // ✅ Navigate to admin page
        navigate("/admin_petowners");
      } else {
        setError("Signup failed, no token returned");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-xl font-bold text-center">Admin Signup</h1>
        <Input
          label="Admin Name"
          value={adminName}
          onChange={(e) => setAdminName(e.target.value)}
          required
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Phone"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <PasswordInput
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          show={showPassword}
          toggleShow={() => setShowPassword(!showPassword)}
        />
        <PasswordInput
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          show={showConfirmPassword}
          toggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-black text-white rounded-md"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
}

// Reusable input components
function Input({ label, type = "text", value, onChange, required }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="border rounded-md px-3 py-2"
      />
    </div>
  );
}

function PasswordInput({ label, value, onChange, show, toggleShow }) {
  return (
    <div className="relative flex flex-col">
      <label className="text-sm font-medium">{label}</label>
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="border rounded-md px-3 py-2"
      />
      <button
        type="button"
        onClick={toggleShow}
        className="absolute right-2 top-8"
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}
