import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const VITE_API_BASE1 = import.meta.env.VITE_API_BASE;

const Admin_BannedUsers = () => {
  const [users, setUsers] = useState([]);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [selectedUserForReason, setSelectedUserForReason] = useState(null);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false); // Dropdown
  const [stats, setStats] = useState({ petOwnersCount: 0, clinicsCount: 0 });
  const navigate = useNavigate();

  // Unban confirmation
  const [confirmUnban, setConfirmUnban] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchBannedUsers();
    fetchStats();
    const interval = setInterval(() => {
      fetchBannedUsers();
      fetchStats();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchBannedUsers = async () => {
    try {
      const res = await axios.get(`${VITE_API_BASE1}/api/users/banned`);
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching banned users:", err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${VITE_API_BASE1}/api/stats`);
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const handleViewReason = (user) => {
    setSelectedUserForReason(user);
    setShowReasonModal(true);
  };

  const handleCloseReasonModal = () => {
    setShowReasonModal(false);
    setSelectedReason("");
  };

  const handleUnban = async (userId) => {
    try {
      await axios.put(`${VITE_API_BASE1}/api/users/unban/${userId}`);
      fetchBannedUsers();
    } catch (err) {
      console.error("Error unbanning user:", err);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white shadow-lg w-full    mx-auto rounded-xl overflow-hidden border p-4 sm:p-6 border-gray-300">
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
        {/* Wrap dropdown in relative container */}
        <div className="relative z-10 mb-4 sm:mb-8">
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
            <div className="absolute top-full left-0 mt-1 w-36 sm:w-40 bg-white border border-gray-300 rounded-md shadow-md z-0 sm:z-50">
              <ul className="py-1 text-xs sm:text-sm">
                <li
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate("/admin_bannedvet");
                    setOpen(false);
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

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr className="bg-[#989898] text-white text-left">
              <th className="px-4 py-2">Client Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Reason</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-[#D9D9D9]" : "bg-white"}
              >
                <td className="px-4 py-2 text-black">{user.clientname}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.contact}</td>
                <td className="px-4 py-2">
                  {user.status ? "Banned" : "Active"}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleViewReason(user)}
                    className="bg-[#8D8C8C] text-black px-3 py-1 rounded-full text-xs sm:text-sm"
                  >
                    View
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setConfirmUnban(true);
                    }}
                    className="bg-[#FC7C7C] text-[#8D0002] px-3 py-1 rounded-full text-xs sm:text-sm"
                  >
                    Unban
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUserForReason && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-lg w-[400px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-3 text-gray-800">
              Ban Details for {selectedUserForReason.clientname}
            </h2>

            {/* Ban Reason */}
            <div className="mb-4">
              <p className="text-gray-600 font-medium mb-1">Reason:</p>
              <p className="bg-gray-100 p-2 rounded text-gray-800">
                {selectedUserForReason.reason || "No reason provided"}
              </p>
            </div>

            {/* Evidence Images */}
            {/* Evidence Images */}
            <div className="mt-2">
              <p className="font-medium">Evidence Image:</p>
              {(() => {
                let images = [];

                if (selectedUserForReason?.evidence_image) {
                  try {
                    // Try parsing JSON array (e.g., '["url1","url2"]')
                    images = JSON.parse(selectedUserForReason.evidence_image);
                  } catch {
                    // Otherwise assume it's a single string URL
                    images = [selectedUserForReason.evidence_image];
                  }
                }

                return images.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {images.map((url, idx) => (
                      <img
                        key={idx}
                        src={url}
                        alt={`Evidence ${idx + 1}`}
                        className="w-24 h-24 object-cover rounded-lg border cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => window.open(url, "_blank")}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    No evidence image provided
                  </p>
                );
              })()}
            </div>

            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                onClick={() => setSelectedUserForReason(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Unban Modal */}
      {confirmUnban && selectedUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Confirm Unban
            </h2>
            <p className="text-gray-700 text-center">
              Are you sure you want to unban{" "}
              <strong>{selectedUser.clientname}</strong>?
            </p>
            <div className="flex justify-end mt-4 space-x-3">
              <button
                onClick={() => setConfirmUnban(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await handleUnban(selectedUser.user_id);
                  setConfirmUnban(false);
                  setSelectedUser(null);
                }}
                className="bg-[#FC7C7C] text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Yes, Unban
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin_BannedUsers;
