import React, { useState } from "react";
import axios from "axios";

const VITE_API_BASE1 = import.meta.env.VITE_API_BASE;

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // ✅ Grab token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not logged in.");
        return;
      }

      // ✅ Call backend endpoint
      const response = await axios.put(
        `${VITE_API_BASE1}/api/admin/update`,
        { oldPassword, password: newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(response.data.message);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to update password. Try again."
      );
    }
  };

  const inputStyle =
    "w-full sm:w-[400px] h-full px-4 pr-12 text-[16px] sm:text-[18px] rounded-[20px] border-2 font-bold font-[Roboto] focus:outline-none tracking-wide";

  const labelStyle = "mb-2 text-[16px] sm:text-[18px] font-bold text-black";
  const inputGroupStyle = "relative w-full sm:w-[400px] h-[55px] sm:h-[65px]";
  const iconStyle =
    "h-5 w-5 sm:h-6 sm:w-6 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer opacity-70 hover:opacity-100";

  return (
    <div className="min-h-screen w-full bg-white flex px-4 py-8 font-[Roboto]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#D9D9D9] p-6 md:p-8 rounded-3xl flex flex-col items-start justify-start w-full max-w-4xl mx-auto space-y-6"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-black">
          Change Password
        </h1>

        {/* Old Password */}
        <div className="w-full">
          <label className={labelStyle}>Old Password</label>
          <div className={inputGroupStyle}>
            <input
              type={showOld ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className={`${inputStyle} border-green-400`}
              placeholder="Enter old password"
            />
            <img
              src={showOld ? "/Eye.png" : "/Eye_off.png"}
              alt="Toggle"
              onClick={() => setShowOld(!showOld)}
              className={iconStyle}
            />
          </div>
        </div>

        {/* New Password */}
        <div className="w-full">
          <label className={labelStyle}>New Password</label>
          <div className={inputGroupStyle}>
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`${inputStyle} border-blue-400`}
              placeholder="Enter new password"
            />
            <img
              src={showNew ? "/Eye.png" : "/Eye_off.png"}
              alt="Toggle"
              onClick={() => setShowNew(!showNew)}
              className={iconStyle}
            />
          </div>
          <ul className="text-sm text-black mt-3 list-disc list-inside">
            <li>Minimum 12 characters</li>
            <li>One uppercase character</li>
            <li>One lowercase character</li>
            <li>One special character</li>
            <li>One number</li>
          </ul>
        </div>

        {/* Confirm Password */}
        <div className="w-full">
          <label className={labelStyle}>Confirm Password</label>
          <div className={inputGroupStyle}>
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`${inputStyle} ${
                error ? "border-red-500" : "border-gray-400"
              }`}
              placeholder="Re-enter new password"
            />
            <img
              src={showConfirm ? "/Eye.png" : "/Eye_off.png"}
              alt="Toggle"
              onClick={() => setShowConfirm(!showConfirm)}
              className={iconStyle}
            />
          </div>
          {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
          {success && <p className="text-sm text-green-600 mt-1">{success}</p>}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row self-center sm:mr-47 gap-4 sm:gap-15 mt-6 w-full sm:w-auto sm:ml-52">
          <button
            type="submit"
            className="bg-white text-black border border-gray-300 px-6 py-2 rounded-full shadow hover:bg-gray-100 transition w-full sm:w-auto"
          >
            Confirm
          </button>
          <button
            type="button"
            className="bg-white text-black border border-gray-300 px-6 py-2 rounded-full shadow hover:bg-gray-100 transition w-full sm:w-auto"
            onClick={() => {
              setOldPassword("");
              setNewPassword("");
              setConfirmPassword("");
              setError("");
              setSuccess("");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
