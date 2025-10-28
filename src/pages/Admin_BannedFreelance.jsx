import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const VITE_API_BASE1 = import.meta.env.VITE_API_BASE;

const Admin_BannedFreelance = () => {
  const [vets, setVets] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedVetForReason, setSelectedVetForReason] = useState(null);
  const [confirmUnban, setConfirmUnban] = useState(false);
  const [selectedVet, setSelectedVet] = useState(null);
  const navigate = useNavigate();

  // Fetch banned freelance vets
  useEffect(() => {
    fetchBannedVets();
    const interval = setInterval(fetchBannedVets, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchBannedVets = async () => {
    try {
      const res = await axios.get(`${VITE_API_BASE1}/api/vets/banned`);

      setVets(res.data);
    } catch (err) {
      console.error("Error fetching banned freelance vets:", err);
    }
  };

  const handleUnban = async (vetId) => {
    try {
      await axios.put(`${VITE_API_BASE1}/api/vets/unban/${vetId}`);
      setUnbanMessage("Vet has been successfully unbanned ✅");
      fetchBannedVets();
    } catch (err) {
      console.error("Error unbanning vet:", err);
      setUnbanMessage("❌ Failed to unban vet. Please try again.");
      setTimeout(() => setUnbanMessage(""), 3000);
    }
  };

  const filteredVets = vets.filter((vet) =>
    vet.name.toLowerCase().includes(search.toLowerCase())
  );
  const [unbanMessage, setUnbanMessage] = useState("");

  return (
    <div className="bg-white shadow-lg w-full mx-auto rounded-xl overflow-hidden border p-4 sm:p-6 border-gray-300">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-10 mb-6">
        {unbanMessage && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-800 rounded-lg text-center font-medium">
            {unbanMessage}
          </div>
        )}
        {/* Search Bar */}
        <div className="flex items-center w-full sm:w-[562px] h-[42px] sm:h-[46px] bg-[#D9D9D9] rounded-full px-3 sm:px-4 py-2 shadow-md mb-4 sm:mb-8">
          <input
            type="text"
            placeholder="Search veterinarians..."
            className="flex-1 outline-none font-roboto text-black text-sm sm:text-base bg-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="text-black w-5 h-5 sm:w-6 sm:h-6" />
        </div>

        {/* Dropdown Navigation */}
        <div className="relative z-10 mb-4 sm:mb-8">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between w-36 sm:w-40 px-3 py-1 border border-gray-400 rounded-md shadow-sm bg-white text-xs sm:text-sm font-medium"
          >
            <span>Freelance Vets</span>
            <span>
              <img src="./dropdown.png" alt="Dropdown" className="w-3 sm:w-4" />
            </span>
          </button>

          {open && (
            <div className="absolute top-full left-0 mt-1 w-36 sm:w-40 bg-white border border-gray-300 rounded-md shadow-md z-50">
              <ul className="py-1 text-xs sm:text-sm">
                <li
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate("/admin_bannedusers");
                    setOpen(false);
                  }}
                >
                  Pet Owners
                </li>
                <li
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate("/admin_veterinaries");
                    setOpen(false);
                  }}
                >
                  Veterinaries
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="bg-[#989898] text-white text-left">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Specialization</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Ban Reason</th>
              <th className="px-4 py-2">Evidence</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredVets.map((vet, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-[#D9D9D9]" : "bg-white"}
              >
                <td className="px-4 py-2 text-black">{vet.name}</td>
                <td className="px-4 py-2">{vet.specialization}</td>
                <td className="px-4 py-2">{vet.department}</td>
                <td className="px-4 py-2">{vet.email}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => setSelectedVetForReason(vet)}
                    className="bg-[#8D8C8C] text-black px-3 py-1 rounded-full text-xs sm:text-sm"
                  >
                    View
                  </button>
                </td>
                <td className="px-4 py-2">
                  {vet.evidence_image ? (
                    <button
                      onClick={() => window.open(vet.evidence_image, "_blank")}
                      className="text-blue-600 underline text-sm"
                    >
                      View Image
                    </button>
                  ) : (
                    <span className="text-gray-500 italic">None</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => {
                      setSelectedVet(vet);
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

      {/* Reason Modal */}
      {selectedVetForReason && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-lg w-[400px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-3 text-gray-800">
              Ban Details for {selectedVetForReason.name}
            </h2>

            <div className="mb-4">
              <p className="text-gray-600 font-medium mb-1">Reason:</p>
              <p className="bg-gray-100 p-2 rounded text-gray-800">
                {selectedVetForReason.ban_reason || "No reason provided"}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                onClick={() => setSelectedVetForReason(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Unban Modal */}
      {confirmUnban && selectedVet && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Confirm Unban
            </h2>
            <p className="text-gray-700 text-center">
              Are you sure you want to unban <strong>{selectedVet.name}</strong>
              ?
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
                  await handleUnban(selectedVet.vet_id);
                  setConfirmUnban(false);
                  setSelectedVet(null);
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

export default Admin_BannedFreelance;
