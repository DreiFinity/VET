import React, { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const [adminName, setAdminName] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [showAnnouncements, setShowAnnouncements] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem("admin_name");
    if (name) setAdminName(name);
  }, []);

  // 🔹 Fetch announcements from backend
  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/announcements/admin_announcements"
      );
      setAnnouncements(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch announcements:", err);
    }
  };

  // 🔹 Format start date for readability
  const formatDate = (dateString) => {
    if (!dateString) return "No date specified";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // 🔹 Toggle the popup & fetch when opened
  const handleNotificationClick = () => {
    if (!showAnnouncements) fetchAnnouncements();
    setShowAnnouncements(!showAnnouncements);
  };

  return (
    <div className="fixed top-0 left-0 md:left-80 right-0 z-50 h-18 sm:h-24 border border-black bg-[#d6d6d6] flex justify-between items-center px-4 shadow-md">
      {/* Left Section: Logo / Title */}
      <div className="flex items-center ml-4 sm:ml-8">
        <img
          src="/signin-logo.png"
          alt="Logo"
          className="w-10 h-10 sm:w-16 sm:h-16"
        />
        <div className="text-lg sm:text-xl font-bold ml-2">Admin</div>
      </div>

      {/* Right Section: Notifications + Admin Name */}
      <div className="relative flex items-center space-x-3 sm:space-x-5 text-gray-700">
        {/* Notification Icon */}
        <img
          src="/Notification.png"
          alt="Notifications"
          className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer hover:scale-110 transition-transform"
          onClick={handleNotificationClick}
        />

        {/* Admin Name */}
        {adminName && (
          <span className="truncate max-w-[120px] sm:max-w-xs font-semibold sm:font-bold text-sm sm:text-lg text-black">
            Welcome, {adminName}
          </span>
        )}

        {/* 🔹 Announcements Popup */}
        {showAnnouncements && (
          <div className="absolute right-0 top-12 sm:top-16 w-72 sm:w-96 max-h-[70vh] overflow-y-auto bg-white border border-gray-300 rounded-xl shadow-xl p-4 z-50">
            <h3 className="text-base sm:text-lg font-bold mb-3 border-b pb-2 text-gray-800 flex justify-between items-center">
              Announcements
              <button
                onClick={() => setShowAnnouncements(false)}
                className="text-gray-500 hover:text-red-600 text-sm sm:text-base"
              >
                ✕
              </button>
            </h3>

            {announcements.length === 0 ? (
              <p className="text-gray-500 text-sm text-center">
                No active announcements
              </p>
            ) : (
              announcements.map((a) => (
                <div
                  key={a.announcement_id}
                  className="mb-3 p-3 rounded-lg border-l-4 border-blue-500 bg-gray-50 shadow-sm hover:bg-blue-50 transition"
                >
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                    {a.title}
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm mb-1">
                    {a.content}
                  </p>
                  {a.category && (
                    <p className="text-xs text-gray-500 italic">
                      Category: {a.category}
                    </p>
                  )}
                  {a.start_datetime && (
                    <p className="text-xs text-gray-500">
                      Starts: {formatDate(a.start_datetime)}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
