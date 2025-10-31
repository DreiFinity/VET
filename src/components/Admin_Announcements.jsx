import React, { useState, useEffect } from "react";
import axios from "axios";

const VITE_API_BASE = import.meta.env.VITE_API_BASE;

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    priority: "normal",
    status: "Draft",
    targetAudience: "All Users",
    start_datetime: "",
    end_datetime: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const targetOptions = [
    { label: "All Users", value: "All Users" },
    { label: "Pet Owners", value: "client" },
    { label: "Clinics", value: "clinic_owner" },
    { label: "Veterinarians", value: "veterinarian" },
    { label: "Admins", value: "admin" },
  ];

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get(`${VITE_API_BASE}/api/announcements`);
      setAnnouncements(res.data);
    } catch (err) {
      console.error("❌ Error fetching announcements:", err);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `${VITE_API_BASE}/api/announcements/${editingId}`,
          formData
        );
        alert("✅ Announcement updated!");
      } else {
        await axios.post(`${VITE_API_BASE}/api/announcements`, formData);
        alert("✅ Announcement created!");
      }
      setFormData({
        title: "",
        content: "",
        category: "",
        priority: "normal",
        status: "Draft",
        targetAudience: "All Users",
        start_datetime: "",
        end_datetime: "",
      });
      setEditingId(null);
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save announcement");
    }
  };

  const handleEdit = (a) => {
    setFormData({
      title: a.title,
      content: a.content,
      category: a.category,
      priority: a.priority,
      status: a.status,
      targetAudience: a.targetAudience || "All Users",
      start_datetime: a.start_datetime?.slice(0, 16) || "",
      end_datetime: a.end_datetime?.slice(0, 16) || "",
    });
    setEditingId(a.announcement_id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this announcement?")) return;
    try {
      await axios.delete(`${VITE_API_BASE}/api/announcements/${id}`);
      alert("🗑️ Deleted successfully");
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete");
    }
  };

  const filtered = announcements.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📢 Announcements Manager</h1>

      {/* Create / Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-4 mb-6 space-y-3"
      >
        <h2 className="text-lg font-semibold mb-2">
          {editingId ? "✏️ Edit Announcement" : "📝 Create New Announcement"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          className="border p-2 rounded w-full h-24"
        />

        <div className="grid grid-cols-2 gap-4">
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>

        <select
          name="targetAudience"
          value={formData.targetAudience}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          {targetOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="datetime-local"
            name="start_datetime"
            value={formData.start_datetime}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="datetime-local"
            name="end_datetime"
            value={formData.end_datetime}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update Announcement" : "Create Announcement"}
        </button>
      </form>

      {/* Search */}
      <input
        placeholder="🔍 Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Target</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((a) => (
                <tr key={a.announcement_id} className="border-t">
                  <td className="p-3">{a.title}</td>
                  <td className="p-3">{a.category}</td>
                  <td className="p-3">
                    {a.target_role_id === null ? "All Users" : a.target_role_id}
                  </td>
                  <td className="p-3">{a.priority}</td>
                  <td className="p-3">{a.status}</td>
                  <td className="p-3 space-x-2">
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
            ) : (
              <tr>
                <td className="p-3 text-center" colSpan="6">
                  No announcements found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
