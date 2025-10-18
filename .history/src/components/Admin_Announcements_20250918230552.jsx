import React from "react";

const Admin_Announcements = () => {
  return (
    <div className="bg-white shadow-lg w-full max-w-[1100px] mx-auto rounded-xl overflow-hidden border border-gray-300 p-4 sm:p-6">
      <label htmlFor="" className="font-bold justify-start text-2xl mb-10">
        Announcements
      </label>
      <div className="bg-[#f6f6f6] min-h-screen p-4 sm:p-6 flex flex-col items-center justify-center">
        <label htmlFor="" className="font-bold justify-start text-2xl mb-6">
          Create New Announcement
        </label>
      </div>
    </div>
  );
};

export default Admin_Announcements;
