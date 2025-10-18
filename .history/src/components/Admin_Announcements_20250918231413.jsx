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

        <div className="flex-row mt-6">
          <div className="flex flex-col">
            <label htmlFor=""> Title.*</label>
            <input
              type="text"
              placeholder="Enter announcement title"
              className="w-lg h-10 p-4 border-gray-300 border rounded-m mb-6"
            />
          </div>

          <div className="flex flex-row">
            <input
              list="categories"
              placeholder="Select or type category..."
              className="border rounded-md px-3 py-2 w-64"
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
