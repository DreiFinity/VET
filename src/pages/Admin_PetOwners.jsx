import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const Admin_PetOwners = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ petOwnersCount: 0, clinicsCount: 0 });
  const navigate = useNavigate();

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [banReason, setBanReason] = useState("");

  useEffect(() => {
    // Initial fetch
    fetchUsers();
    fetchStats();

    // Auto-refresh every 5 seconds (5000 ms)
    const interval = setInterval(() => {
      fetchUsers();
      fetchStats();
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users/pet-owners".trim()
      );

      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };
  // ✅ Fetch stats from backend
  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const handleOpenBanModal = (user) => {
    setSelectedUser(user);
    setBanReason("");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setBanReason("");
  };

  const handleConfirmBan = async () => {
    if (!banReason.trim()) {
      alert("Please provide a ban reason.");
      return;
    }
    try {
      await axios.put(
        `http://localhost:5000/api/users/ban/${selectedUser.user_id}`,
        {
          reason: banReason,
        }
      );
      alert("User banned successfully!");
      handleCloseModal();
      fetchUsers();
    } catch (err) {
      console.error("Error banning user:", err);
      alert("Failed to ban user.");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.client_name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.user_id?.toString().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white shadow-lg w-full  mx-auto rounded-xl overflow-hidden border p-4 sm:p-6 border-gray-300">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-10 mb-6">
        <div className="flex items-center w-full sm:w-[562px] h-[42px] sm:h-[46px] bg-[#D9D9D9] rounded-full px-3 sm:px-4 py-2 shadow-md mb-4 sm:mb-8">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 outline-none font-roboto text-black text-sm sm:text-base bg-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="text-black w-5 h-5 sm:w-6 sm:h-6" />
        </div>

        {/* Dropdown Button */}
        <div className="relative mb-4 sm:mb-8">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between w-36 sm:w-40 px-3 py-1 border border-gray-400 rounded-md shadow-sm bg-white text-xs sm:text-sm font-medium"
          >
            <span>PetOwners</span>
            <span>
              <img src="./dropdown.png" alt="Dropdown" className="w-3 sm:w-4" />
            </span>
          </button>

          {open && (
            <div className="absolute top-full left-0 mt-1 w-36 sm:w-40 bg-white border border-gray-300 rounded-md shadow-md z-10">
              <ul className="py-1 text-xs sm:text-sm">
                <li
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate("/admin_veterinaries"); // navigate inside AdminLayout
                    setOpen(false); // close the dropdown
                  }}
                >
                  Veterinaries
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="flex space-x-4 sm:space-x-6 justify-center">
          <div className="bg-gray-300 px-3 sm:px-4 py-2 w-32 sm:w-40 rounded-[16px] sm:rounded-[20px] text-center">
            <h2 className="text-lg sm:text-xl font-bold">
              {stats.petOwnersCount}
            </h2>
            <p className="text-sm sm:text-lg">PetOwners</p>
          </div>

          <div className="bg-gray-300 px-3 sm:px-4 py-2 w-32 sm:w-40 rounded-[16px] sm:rounded-[20px] text-center">
            <h2 className="text-lg sm:text-xl font-bold">
              {stats.clinicsCount}
            </h2>
            <p className="text-sm sm:text-lg">Clinics</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr className="bg-[#989898] text-white text-left">
              <th className="px-4 py-2">Client Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.user_id} className="bg-[#D9D9D9]">
                <td className="px-4 py-2">{u.client_name}</td>
                <td className="px-4 py-2 text-blue-600 underline">{u.email}</td>
                <td className="px-4 py-2">{u.phone || "N/A"}</td>
                <td className="px-4 py-2">
                  {u.is_banned ? "Banned" : "Active"}
                </td>
                <td className="px-4 py-2">
                  {!u.is_banned ? (
                    <button
                      onClick={() => handleOpenBanModal(u)}
                      className="bg-red-200 text-red-600 px-3 py-1 rounded-full text-xs sm:text-sm"
                    >
                      Ban
                    </button>
                  ) : (
                    <span className="text-gray-500">Already Banned</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ban Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4 text-center">Ban User</h2>
            <p className="mb-2 text-sm text-gray-700">
              Provide a reason for banning{" "}
              <span className="font-bold">{selectedUser?.client_name}</span>:
            </p>
            <textarea
              className="w-full border rounded-md p-2 text-sm"
              rows="4"
              placeholder="Enter reason here..."
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)}
            />
            <div className="flex justify-end mt-4 space-x-3">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBan}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Confirm Ban
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin_PetOwners;
