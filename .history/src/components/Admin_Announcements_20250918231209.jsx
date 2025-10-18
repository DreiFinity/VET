import React from "react";

const Admin_Announcements = () => {
  return (
    <div className="bg-white shadow-lg w-full max-w-[1100px] mx-auto rounded-xl overflow-hidden border border-gray-300 p-4 sm:p-6">
      <label htmlFor="" className="font-bold justify-start text-2xl mb-10">
        Announcements
      </label>
      <div className="bg-[#f6f6f6] min-h-screen p-8 sm:p-6 ">
        <label htmlFor="" className="font-bold justify-start text-2xl mb-6">
          Create New Announcement
        </label>

        <div className="flex-row ">
          <label htmlFor=""> Title.*</label>
          <input
            type="text"
            placeholder="Enter announcement title"
            className="w-lg h-10 p-4 border-gray-300 border rounded-lg mb-6"
          />
        </div>
      </div>
    </div>
  );
};

export default Admin_Announcements;
