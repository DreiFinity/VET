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

        <div className="flex flex-row mt-6 space-x-6">
          {/* Title */}
          <div className="flex flex-col w-lg">
            <label htmlFor="title" className="mb-1">
              Title *
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter announcement title"
              className="w-full h-10 p-4 border-gray-300 border rounded-md"
            />
          </div>

          {/* Category dropdown */}
          <div className="flex flex-col w-lg">
            <label htmlFor="categories" className="mb-1">
              Category
            </label>
            <input
              list="categories"
              placeholder="Select or type category..."
              className="border rounded-md px-3 py-2 w-lg"
            />
            <datalist id="categories">
              <option value="General" />
              <option value="Maintenance" />
              <option value="New Feature" />
              <option value="Policy Update" />
              <option value="Event" />
            </datalist>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_Announcements;
