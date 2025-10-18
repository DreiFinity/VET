import React, { useState } from "react";

const Admin_Announcements = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [draft, setDraft] = useState("");

  const categories = [
    "General",
    "Maintenance",
    "New Feature",
    "Policy Update",
    "Event",
  ];
  const targetAudiences = ["All Users", "Pet Owners", "Veterinarians"];
  con;

  return (
    <div className="bg-white shadow-lg w-full max-w-[1100px] mx-auto rounded-xl overflow-hidden border border-gray-300 p-4 sm:p-6">
      <label className="font-bold justify-start text-2xl mb-10 block">
        Announcements
      </label>
      <div className="bg-[#f6f6f6] min-h-screen p-8 sm:p-6">
        <label className="font-bold justify-start text-2xl mb-6 block">
          Create New Announcement
        </label>

        <div className="flex flex-row mt-6 space-x-6">
          {/* Title */}
          <div className="flex flex-col flex-1">
            <label htmlFor="title" className="mb-1">
              Title *
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter announcement title"
              className="w-full h-10 px-4 border-gray-300 border rounded-md"
            />
          </div>

          {/* Custom Category dropdown */}
          <div className="flex flex-col w-64 relative">
            <label className="mb-1">Category</label>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="border rounded-md px-3 py-2 text-left bg-white shadow-sm"
            >
              {category || "Select category..."}
            </button>

            {open && (
              <ul className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {categories.map((c, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setCategory(c);
                      setOpen(false);
                    }}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div>
          <textarea
            placeholder="Enter your announcement content here..."
            className="w-full h-64 p-4 border border-gray-300 rounded-md mt-6 text-left align-top resize-none"
          />
        </div>

        <div className="flex flex-row space-x-6 mt-6">
          {/* Start Date & Time */}
          <div className="flex flex-col w-full">
            <label htmlFor="startDate" className="mb-1 font-medium">
              Start Date & Time
            </label>
            <input
              id="startDate"
              type="datetime-local"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* End Date & Time */}
          <div className="flex flex-col w-full">
            <label htmlFor="endDate" className="mb-1 font-medium">
              End Date & Time
            </label>
            <input
              id="endDate"
              type="datetime-local"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>

        <div className="flex flex-col mt-6">
          <label className="font-medium mb-2">Priority Level</label>
          <div className="flex space-x-6">
            {/* Low */}
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="priority"
                value="low"
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span>Low</span>
            </label>

            {/* Medium */}
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="priority"
                value="medium"
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span>Medium</span>
            </label>

            {/* High */}
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="priority"
                value="high"
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span>High</span>
            </label>
          </div>
        </div>

        <div className="flex flex-row">
          <div className="flex flex-col">
            {/* Dropdown Button */}
            <div className="relative mb-4 sm:mb-8">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-36 sm:w-40 px-3 py-1 border border-gray-400 rounded-md shadow-sm bg-white text-xs sm:text-sm font-medium"
              >
                <span>Pet Owners</span>
                <span>
                  <img
                    src="/dropdown.png"
                    alt="Dropdown"
                    className="w-3 sm:w-4"
                  />
                </span>
              </button>

              {open && (
                <div className="absolute top-full left-0 mt-1 w-36 sm:w-40 bg-white border border-gray-300 rounded-md shadow-md z-10">
                  <ul className="py-1 text-xs sm:text-sm">
                    <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                      Veterinaries
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_Announcements;
