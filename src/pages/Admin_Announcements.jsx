import React, { useState, useEffect } from "react";
import axios from "axios";

const VITE_API_BASE = import.meta.env.VITE_API_BASE;

const Admin_Announcements = () => {
  // States
  const [openCategory, setOpenCategory] = useState(false);
  const [openAudience, setOpenAudience] = useState(false);
  const [openDraft, setOpenDraft] = useState(false);
  const [category, setCategory] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [draft, setDraft] = useState("");
  const [priority, setPriority] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  // Dropdown data
  const categories = [
    "General",
    "Maintenance",
    "New Feature",
    "Policy Update",
    "Event",
  ];

  const targetAudiences = [
    { label: "All Users", value: "null" },
    { label: "Pet Owners", value: "client" },
    { label: "Clinic Owners", value: "clinic_owner" },
    { label: "Veterinarians", value: "veterinarian" },
    { label: "Admin", value: "admin" },
  ];

  const drafts = ["Draft", "Published"];

  // Load announcements on mount
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get(`${VITE_API_BASE}/api/announcements`);
      setAnnouncements(res.data);
    } catch (error) {
      console.error("❌ Failed to load announcements:", error);
    }
  };

  // Create new announcement
  const handlePublish = async () => {
    if (!title || !content || !category || !targetAudience || !draft) {
      alert("Please fill out all required fields!");
      return;
    }

    try {
      const res = await axios.post(`${VITE_API_BASE}/api/announcements`, {
        title,
        content,
        category,
        priority,
        status: draft,
        targetAudience: targetAudience === "null" ? null : targetAudience,
        start_datetime: startDate || null,
        end_datetime: endDate || null,
      });

      alert("✅ Announcement published successfully!");
      handleClear();
      fetchAnnouncements();
    } catch (error) {
      console.error("❌ Failed to create announcement:", error);
      alert("Error creating announcement.");
    }
  };

  // Edit
  const handleEdit = (announcement) => {
    setEditingAnnouncement(announcement);
    setTitle(announcement.title);
    setContent(announcement.content);
    setCategory(announcement.category);
    setPriority(announcement.priority);
    setDraft(announcement.status);
    setTargetAudience(announcement.target_role_id || "null");
    setStartDate(announcement.start_datetime?.slice(0, 16) || "");
    setEndDate(announcement.end_datetime?.slice(0, 16) || "");
  };

  const handleUpdate = async () => {
    if (!editingAnnouncement) return;

    try {
      await axios.put(
        `${VITE_API_BASE}/api/announcements/${editingAnnouncement.announcement_id}`,
        {
          title,
          content,
          category,
          priority,
          status: draft,
          targetAudience: targetAudience === "null" ? null : targetAudience,
          start_datetime: startDate || null,
          end_datetime: endDate || null,
        }
      );

      alert("✅ Announcement updated!");
      handleClear();
      setEditingAnnouncement(null);
      fetchAnnouncements();
    } catch (error) {
      console.error("❌ Failed to update announcement:", error);
      alert("Error updating announcement.");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;

    try {
      await axios.delete(`${VITE_API_BASE}/api/announcements/${id}`);
      alert("🗑️ Announcement deleted!");
      fetchAnnouncements();
    } catch (error) {
      console.error("❌ Failed to delete announcement:", error);
      alert("Error deleting announcement.");
    }
  };

  // Clear form
  const handleClear = () => {
    setTitle("");
    setContent("");
    setCategory("");
    setPriority("");
    setDraft("");
    setTargetAudience("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="bg-[#f6f6f6] shadow-lg w-full max-w-[1100px] mx-auto rounded-xl overflow-hidden border border-gray-300 p-4 sm:p-6">
      <label className="font-bold justify-start text-2xl mb-10 block">
        Announcements
      </label>

      {/* === CREATE / EDIT FORM === */}
      <div className="bg-white min-h-[500px] p-6 sm:p-8">
        <label className="font-bold justify-start text-2xl mb-6 block">
          {editingAnnouncement
            ? "Edit Announcement"
            : "Create New Announcement"}
        </label>

        {/* Title + Category */}
        <div className="flex flex-col sm:flex-row mt-6 gap-6">
          <div className="flex flex-col flex-1">
            <label htmlFor="title" className="mb-1">
              Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter announcement title"
              className="w-full h-10 px-4 border-gray-300 border rounded-md"
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex flex-col w-full sm:w-64 relative">
            <label className="mb-1">Category</label>
            <button
              type="button"
              onClick={() => setOpenCategory(!openCategory)}
              className="flex items-center justify-between w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm bg-white text-sm font-medium"
            >
              <span>{category || "Select category..."}</span>
              <img src="/dropdown.png" alt="Dropdown" className="w-3 sm:w-4" />
            </button>
            {openCategory && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md z-10">
                <ul className="py-1 text-sm">
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
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div>
          <textarea
            placeholder="Enter your announcement content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-64 p-4 border border-gray-300 rounded-md mt-6 text-left align-top resize-none"
          />
        </div>

        {/* Start & End Date */}
        <div className="flex flex-col sm:flex-row gap-6 mt-6">
          <div className="flex flex-col w-full">
            <label htmlFor="startDate" className="mb-1 font-medium">
              Start Date & Time
            </label>
            <input
              id="startDate"
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
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
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>

        {/* Priority */}
        <div className="flex flex-col mt-6">
          <label className="font-medium mb-2">Priority Level</label>
          <div className="flex flex-wrap gap-4">
            {["Low", "Medium", "High"].map((p) => (
              <label key={p} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="priority"
                  value={p.toLowerCase()}
                  checked={priority === p.toLowerCase()}
                  onChange={(e) => setPriority(e.target.value)}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span>{p}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Target Audience & Status */}
        <div className="flex flex-col sm:flex-row mt-6 gap-6 border-b border-gray-300 pb-10 mb-10">
          {/* Target Audience Dropdown */}
          <div className="flex flex-col relative w-full sm:w-64">
            <label className="mb-1">Target Audience</label>
            <button
              type="button"
              onClick={() => setOpenAudience(!openAudience)}
              className="flex items-center justify-between w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm bg-white text-sm font-medium"
            >
              <span>
                {targetAudiences.find((a) => a.value === targetAudience)
                  ?.label || "Select audience..."}
              </span>
              <img src="/dropdown.png" alt="Dropdown" className="w-3 sm:w-4" />
            </button>
            {openAudience && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md z-10">
                <ul className="py-1 text-sm">
                  {targetAudiences.map((aud, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        setTargetAudience(aud.value);
                        setOpenAudience(false);
                      }}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {aud.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Status Dropdown */}
          <div className="flex flex-col relative w-full sm:w-64">
            <label className="mb-1">Status</label>
            <button
              type="button"
              onClick={() => setOpenDraft(!openDraft)}
              className="flex items-center justify-between w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm bg-white text-sm font-medium"
            >
              <span>{draft || "Select status..."}</span>
              <img src="/dropdown.png" alt="Dropdown" className="w-3 sm:w-4" />
            </button>
            {openDraft && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md z-10">
                <ul className="py-1 text-sm">
                  {drafts.map((d, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        setDraft(d);
                        setOpenDraft(false);
                      }}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-end items-center sm:space-x-4">
          <button
            onClick={handleClear}
            className="w-full sm:w-20 h-10 bg-gray-500 px-4 py-2 rounded-md text-white"
          >
            Clear
          </button>
          {editingAnnouncement ? (
            <button
              onClick={handleUpdate}
              className="w-full sm:w-48 h-10 bg-green-600 px-4 py-2 rounded-md text-white"
            >
              Update Announcement
            </button>
          ) : (
            <button
              onClick={handlePublish}
              className="w-full sm:w-48 h-10 bg-blue-500 px-4 py-2 rounded-md text-white"
            >
              Publish Announcement
            </button>
          )}
        </div>
      </div>

      {/* === DISPLAY TABLE === */}
      <div className="bg-white mt-8 p-6 rounded-md shadow-sm border border-gray-300">
        <h2 className="font-bold text-xl mb-4">All Announcements</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse border border-gray-200">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="text-left px-3 py-2">Title</th>
                <th className="text-left px-3 py-2">Category</th>
                <th className="text-left px-3 py-2">Status</th>
                <th className="text-left px-3 py-2">Priority</th>
                <th className="text-left px-3 py-2">Target</th>
                <th className="text-left px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {announcements.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-4 text-gray-500 italic"
                  >
                    No announcements found.
                  </td>
                </tr>
              ) : (
                announcements.map((a) => (
                  <tr
                    key={a.announcement_id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-3 py-2">{a.title}</td>
                    <td className="px-3 py-2">{a.category}</td>
                    <td className="px-3 py-2">{a.status}</td>
                    <td className="px-3 py-2 capitalize">{a.priority}</td>
                    <td className="px-3 py-2">
                      {a.target_role_id || "All Users"}
                    </td>
                    <td className="px-3 py-2 flex gap-2">
                      <button
                        onClick={() => handleEdit(a)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(a.announcement_id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin_Announcements;
