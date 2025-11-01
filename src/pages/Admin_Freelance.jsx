import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VITE_API_BASE1 = import.meta.env.VITE_API_BASE;

const Admin_Freelance = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [vets, setVets] = useState([]);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedVet, setSelectedVet] = useState(null);
  const [banReason, setBanReason] = useState("");

  useEffect(() => {
    fetchVets();
    const interval = setInterval(fetchVets, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchVets = async () => {
    try {
      const res = await axios.get(`${VITE_API_BASE1}/api/vets`);
      setVets(res.data);
    } catch (err) {
      console.error("Error fetching freelance vets:", err);
    }
  };

  const handleOpenBanModal = (vet) => {
    setSelectedVet(vet);
    setBanReason("");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVet(null);
    setBanReason("");
  };

  const handleConfirmBan = async () => {
    if (!banReason.trim()) {
      alert("Please provide a ban reason.");
      return;
    }
    try {
      await axios.put(`${VITE_API_BASE1}/api/vets/ban/${selectedVet.vet_id}`, {
        reason: banReason,
      });
      alert("Vet banned successfully!");
      handleCloseModal();
      fetchVets();
    } catch (err) {
      console.error("Error banning vet:", err);
      alert("Failed to ban vet.");
    }
  };

  const filteredVets = vets.filter(
    (v) =>
      v.name?.toLowerCase().includes(search.toLowerCase()) ||
      v.specialization?.toLowerCase().includes(search.toLowerCase()) ||
      v.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white shadow-lg w-full mx-auto rounded-xl overflow-hidden border p-4 sm:p-6 border-gray-300">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-10 mb-6">
        <div className="flex items-center w-full sm:w-[562px] h-[42px] sm:h-[46px] bg-[#D9D9D9] rounded-full px-3 sm:px-4 py-2 shadow-md mb-4 sm:mb-8">
          <input
            type="text"
            placeholder="Search Freelance Vets"
            className="flex-1 outline-none font-roboto text-black text-sm sm:text-base bg-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="text-black w-5 h-5 sm:w-6 sm:h-6" />
        </div>

        <div className="relative mb-4 sm:mb-8">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between w-36 sm:w-40 px-3 py-1 border border-gray-400 rounded-md shadow-sm bg-white text-xs sm:text-sm font-medium"
          >
            <span>Freelance Vets</span>
            <img src="./dropdown.png" alt="Dropdown" className="w-3 sm:w-4" />
          </button>

          {open && (
            <div className="absolute top-full left-0 mt-1 w-36 sm:w-40 bg-white border border-gray-300 rounded-md shadow-md z-10">
              <ul className="py-1 text-xs sm:text-sm">
                <li
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate("/admin_petowners");
                    setOpen(false);
                  }}
                >
                  PetOwners
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
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr className="bg-[#989898] text-white text-left">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Specialization</th>
              <th className="px-4 py-2">Position</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Employment Type</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredVets.map((v) => (
              <tr key={v.vet_id} className="bg-[#D9D9D9]">
                <td className="px-4 py-2">{v.name}</td>
                <td className="px-4 py-2">{v.specialization}</td>
                <td className="px-4 py-2">{v.position}</td>
                <td className="px-4 py-2">{v.department}</td>
                <td className="px-4 py-2 text-blue-600 underline">{v.email}</td>
                <td className="px-4 py-2">{v.employment_type}</td>
                <td className="px-4 py-2">
                  {v.is_banned ? "Banned" : "Active"}
                </td>
                <td className="px-4 py-2">
                  {!v.is_banned ? (
                    <button
                      onClick={() => handleOpenBanModal(v)}
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
            <h2 className="text-xl font-semibold mb-4 text-center">Ban Vet</h2>
            <p className="mb-2 text-sm text-gray-700">
              Provide a reason for banning{" "}
              <span className="font-bold">{selectedVet?.name}</span>:
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

export default Admin_Freelance;
