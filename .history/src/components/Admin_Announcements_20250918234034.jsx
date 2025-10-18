import React, { useState } from "react";

const Admin_Announcements = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");

  const categories = [
    "General",
    "Maintenance",
    "New Feature",
    "Policy Update",
    "Event",
  ];

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
      </div>
    </div>
  );
};

export default Admin_Announcements;
