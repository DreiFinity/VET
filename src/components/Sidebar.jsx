import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin_name");
    localStorage.removeItem("token");
    navigate("/admin/login"); // redirect to login page
  };

  const menuItems = [
    { name: "Users", path: "/admin_petowners" },
    { name: "Banned Users", path: "/admin_bannedusers" },
    { name: "User Reports", path: "/admin_userreports" },
    { name: "Billings", path: "/admin_billing" },
    { name: "Announce", path: "/admin_announcements" },
    { name: "Settings", path: "/admin_changepassword" },
    { name: "Log out", action: handleLogout }, // add action here
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-20 left-4 z-50 bg-black text-white p-3 rounded-full shadow-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-transparent z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative left-0 top-14 md:top-0 h-screen w-80 md:w-80 flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } bg-[#D9D9D9]`}
      >
        <nav className="flex-1 mt-4 md:mt-0">
          {menuItems.map((item) =>
            item.name === "Log out" ? (
              <button
                key={item.name}
                onClick={item.action}
                className="w-full sm:h-24 h-16 border-2 border-gray-400 flex items-center text-left px-6 text-2xl font-semibold text-black hover:bg-black hover:text-white"
              >
                <LogOut className="mr-2" size={20} />
                {item.name}
              </button>
            ) : (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `w-full sm:h-24 h-16 border-2 border-gray-400 flex items-center text-left px-6 text-2xl font-semibold transition-colors ${
                    isActive
                      ? "bg-black text-white"
                      : "text-black hover:bg-black hover:text-white"
                  }`
                }
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </NavLink>
            )
          )}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
