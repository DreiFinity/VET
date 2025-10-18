import React, { useState } from "react";

const Admin_Announcements = () => {
  const [openCategory, setOpenCategory] = useState(false);
  const [openAudience, setOpenAudience] = useState(false);
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

  return (
    <div className="bg-white shadow-lg w-full max-w-[1100px] mx-auto rounded-xl overflow-hidden border border-gray-300 p-4 sm:p-6">
      <label className="font-bold justify-start text-2xl mb-10 block">
        Announcements
      </label>
      <div className="bg-[#f6f6f6] min-h-screen p-8 sm:p-6">
        <label className="font-bold justify-start text-2xl mb-6 block">
          Create New Announcement
        </label>

        {/* Title + Category */}
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

          {/* Category Dropdown */}
          <div className="flex flex-col w-64 relative">
            <label className="mb-1">Category</label>
            <button
              type="button"
              onClick={() => setOpenCategory(!openCategory)}
              className="border rounded-md px-3 py-2 text-left bg-white shadow-sm"
            >
              {category || "Select category..."}
            </button>

            {openCategory && (
              <ul className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {categories.map((c, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setCategory(c);
                      setOpenCategory(false);
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

        {/* Content */}
        <div>
          <textarea
            placeholder="Enter your announcement content here..."
            className="w-full h-64 p-4 border border-gray-300 rounded-md mt-6 text-left align-top resize-none"
          />
        </div>

        {/* Start & End Date */}
        <div className="flex flex-row space-x-6 mt-6">
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

        {/* Priority */}
        <div className="flex flex-col mt-6">
          <label className="font-medium mb-2">Priority Level</label>
          <div className="flex space-x-6">
            {["Low", "Medium", "High"].map((p) => (
              <label key={p} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="priority"
                  value={p.toLowerCase()}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span>{p}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Target Audience Dropdown */}
        <div className="flex flex-col mt-6 relative w-64">
          <label className="mb-1">Target Audience</label>
          <button
            type="button"
            onClick={() => setOpenAudience(!openAudience)}
            className="flex items-center justify-between w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm bg-white text-sm font-medium"
          >
            {targetAudience || "Select audience..."}
          </button>

          {openAudience && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md z-10">
              <ul className="py-1 text-sm">
                {targetAudiences.map((aud, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setTargetAudience(aud);
                      setOpenAudience(false);
                    }}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {aud}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin_Announcements;
