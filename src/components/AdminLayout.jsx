import React from "react";
import Sidebar from "./components/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Page Content */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
};

export default AdminLayout;
