import React, { useState, useEffect } from "react";
import axios from "axios";

const VITE_API_BASE = import.meta.env.VITE_API_BASE;

const Admin_Announcements = () => {
  const [openCategory, setOpenCategory] = useState(false);
  const [openAudience, setOpenAudience] = useState(false);
  const [openDraft, setOpenDraft] = useState(false);
  const [category, setCategory] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [draft, setDraft] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState(null);

  // Maps for displaying and sending roles correctly
  const roleDisplayMap = {
    1: "Pet Owners",
    2: "Clinics",
    3: "Admin",
    4: "Veterinarians",
    null: "All Users",
  };

  const textToBackendRole = {
    "All Users": null,
    "Pet Owners": "client",
    Clinics: "clinic_owner",
    Admin: "admin",
    Veterinarians: "veterinarian",
  };

  const backendToTextRole = {
    client: "Pet Owners",
    clinic_owner: "Clinics",
    admin: "Admin",
    veterinarian: "Veterinarians",
    null: "All Users",
  };

  const categories = [
    "General",
    "Maintenance",
    "New Feature",
    "Policy Update",
    "Event",
  ];
  const targetAudiences = [
    "All Users",
    "Pet Owners",
    "Clinics",
    "Veterinarians",
    "Admin",
  ];
  const drafts = ["Draft", "Published"];
  const priorities = ["Low", "Medium", "High"];
  const API_BASE = `${VITE_API_BASE}/api/announcements`;

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get(API_BASE);
      setAnnouncements(res.data);
    } catch (err) {
      console.error("Error fetching announcements:", err);
    }
  };

  const clearForm = () => {
    setTitle("");
    setContent("");
    setCategory("");
    setTargetAudience("");
    setDraft("");
    setPriority("");
    setStartDate("");
    setEndDate("");
  };

  const formatForDatetimeLocal = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16);
  };

  const filteredAnnouncements = announcements.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePublish = async () => {
    if (
      !title ||
      !content ||
      !category ||
      !targetAudience ||
      !priority ||
      !draft ||
      !startDate ||
      !endDate
    ) {
      alert("Please fill in all required fields before publishing!");
      return;
    }

    if (!window.confirm("Are you sure you want to publish this announcement?"))
      return;

    try {
      const data = {
        title,
        content,
        category,
        targetAudience: textToBackendRole[targetAudience],
        priority,
        status: draft,
        start_datetime: startDate,
        end_datetime: endDate,
      };
      await axios.post(API_BASE, data);
      fetchAnnouncements();
      clearForm();
    } catch (err) {
      console.error("Error creating announcement:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?"))
      return;

    try {
      await axios.delete(`${API_BASE}/${id}`);
      fetchAnnouncements();
    } catch (err) {
      console.error("Error deleting announcement:", err);
    }
  };

  const handleEditOpen = (announcement) => {
    setEditData({
      ...announcement,
      targetAudience:
        backendToTextRole[announcement.targetAudience] ||
        roleDisplayMap[announcement.target_role_id] ||
        "All Users",
      start_datetime: formatForDatetimeLocal(announcement.start_datetime),
      end_datetime: formatForDatetimeLocal(announcement.end_datetime),
    });
    setEditModal(true);
  };

  const handleEditSave = async () => {
    if (!editData) return;

    try {
      const data = {
        title: editData.title,
        content: editData.content,
        category: editData.category,
        targetAudience: textToBackendRole[editData.targetAudience],
        priority: editData.priority,
        status: editData.status,
        start_datetime: editData.start_datetime,
        end_datetime: editData.end_datetime,
      };
      await axios.put(`${API_BASE}/${editData.announcement_id}`, data);
      setEditModal(false);
      fetchAnnouncements();
    } catch (err) {
      console.error("Error updating announcement:", err);
    }
  };

  return (
    <div className="bg-[#f6f6f6] shadow-lg w-full mx-auto rounded-xl overflow-hidden border border-gray-300 p-4 sm:p-6">
      <label className="font-bold justify-start text-2xl mb-10 block">
        Announcements
      </label>

      <div className="bg-white min-h-[500px] p-6 sm:p-8">
        <label className="font-bold justify-start text-2xl mb-6 block">
          Create New Announcement
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your announcement content here..."
            className="w-full h-64 p-4 border border-gray-300 rounded-md mt-6 text-left align-top resize-none"
          />
        </div>

        {/* Dates */}
        <div className="flex flex-col sm:flex-row gap-6 mt-6">
          <div className="flex flex-col w-full">
            <label>Start Date & Time</label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div className="flex flex-col w-full">
            <label>End Date & Time</label>
            <input
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
            {priorities.map((p) => (
              <label key={p} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="priority"
                  value={p.toLowerCase()}
                  checked={priority === p.toLowerCase()}
                  onChange={() => setPriority(p.toLowerCase())}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span>{p}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Target Audience & Status */}
        <div className="flex flex-col sm:flex-row mt-6 gap-6 border-b border-gray-300 pb-10 mb-10">
          <div className="flex flex-col relative w-full sm:w-64">
            <label className="mb-1">Target Audience</label>
            <button
              type="button"
              onClick={() => setOpenAudience(!openAudience)}
              className="flex items-center justify-between w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm bg-white text-sm font-medium"
            >
              <span>{targetAudience || "Select audience..."}</span>
              <img src="/dropdown.png" alt="Dropdown" className="w-3 sm:w-4" />
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
            onClick={clearForm}
            className="w-full sm:w-20 h-10 bg-gray-500 px-4 py-2 rounded-md text-white"
          >
            Clear
          </button>
          <button
            onClick={handlePublish}
            className="w-full sm:w-48 h-10 bg-blue-500 px-4 py-2 rounded-md text-white"
          >
            Publish Announcement
          </button>
        </div>
      </div>

      {/* Recent Announcements */}
      <div className="bg-white min-h-[400px] p-6 sm:p-8 mt-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-gray-300 pb-8 gap-4">
          <div>
            <label className="font-medium text-xl">Recent Announcements</label>
          </div>
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              className="bg-white border border-gray-300 pl-5 pr-2 py-2 rounded-md w-full"
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {filteredAnnouncements.map((a) => (
            <div
              key={a.announcement_id}
              className="flex flex-col sm:flex-row justify-between gap-6 border-b border-gray-300 pb-4 w-full"
            >
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex flex-row justify-between items-center w-full">
                  <label className="font-medium text-lg truncate">
                    {a.title}
                  </label>
                </div>
                <div className="flex flex-wrap gap-3 mt-2 items-center">
                  <span className="truncate">
                    <strong>Start:</strong>{" "}
                    {new Date(a.start_datetime).toLocaleString()}
                  </span>
                  <span className="truncate">
                    <strong>End:</strong>{" "}
                    {new Date(a.end_datetime).toLocaleString()}
                  </span>
                  <span className="truncate">
                    <strong>Created:</strong>{" "}
                    {new Date(a.created_at).toLocaleString()}
                  </span>
                </div>
                <div className="flex-col flex-wrap space-x-4 mt-2">
                  <button className="bg-red-300 px-3 py-2 text-sm rounded-full flex-shrink-0">
                    {a.priority.toUpperCase()}
                  </button>
                  <button className="bg-gray-300 px-3 py-2 text-sm rounded-full flex-shrink-0">
                    {a.status}
                  </button>
                  <label className="text-sm truncate">
                    {a.category} -{" "}
                    {roleDisplayMap[a.target_role_id] || "All Users"}
                  </label>
                </div>
                <div className="mt-2 break-words">
                  <label>{a.content}</label>
                </div>
              </div>
              <div className="flex flex-row gap-3 flex-shrink-0">
                <button
                  onClick={() => handleEditOpen(a)}
                  className="bg-gray-500 px-4 py-2 text-sm w-28 sm:w-28 h-10 rounded-full text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(a.announcement_id)}
                  className="bg-red-500 px-4 py-2 text-sm w-28 sm:w-28 h-10 rounded-full text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {editModal && editData && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Edit Announcement</h2>
            <input
              type="text"
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
            />
            <textarea
              value={editData.content}
              onChange={(e) =>
                setEditData({ ...editData, content: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
            />
            <select
              value={editData.category}
              onChange={(e) =>
                setEditData({ ...editData, category: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={editData.targetAudience}
              onChange={(e) =>
                setEditData({ ...editData, targetAudience: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
            >
              {targetAudiences.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <select
              value={editData.priority}
              onChange={(e) =>
                setEditData({ ...editData, priority: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
            >
              {priorities.map((p) => (
                <option key={p} value={p.toLowerCase()}>
                  {p}
                </option>
              ))}
            </select>
            <select
              value={editData.status}
              onChange={(e) =>
                setEditData({ ...editData, status: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
            >
              {drafts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <div className="flex gap-2 mb-2">
              <input
                type="datetime-local"
                value={editData.start_datetime}
                onChange={(e) =>
                  setEditData({ ...editData, start_datetime: e.target.value })
                }
                className="w-1/2 p-2 border rounded"
              />
              <input
                type="datetime-local"
                value={editData.end_datetime}
                onChange={(e) =>
                  setEditData({ ...editData, end_datetime: e.target.value })
                }
                className="w-1/2 p-2 border rounded"
              />
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setEditModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin_Announcements;
