import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VITE_API_BASE1 = import.meta.env.VITE_API_BASE;

const Admin_BannedVet = () => {
  const [search, setSearch] = useState("");
  const [clinics, setClinics] = useState([]);
  const [open, setOpen] = useState(false); // dropdown state
  const [stats, setStats] = useState({ petOwnersCount: 0, clinicsCount: 0 });
  const navigate = useNavigate();

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState(null);

  const fetchBannedClinics = async () => {
    try {
      const res = await axios.get(`${VITE_API_BASE1}/api/clinics/banned`);
      setClinics(res.data.data || res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnban = async (ownerId, name) => {
    if (!window.confirm(`Unban ${name}?`)) return;
    try {
      await axios.put(`${VITE_API_BASE1}/api/clinics/unban/${ownerId}`);
      alert(`${name} has been unbanned.`);
      fetchBannedClinics();
    } catch (err) {
      console.error(err);
      alert("Failed to unban.");
    }
  };

  const handleViewReason = (clinic) => {
    setSelectedClinic(clinic);
    setShowModal(true);
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${VITE_API_BASE1}/api/stats`);
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  useEffect(() => {
    fetchBannedClinics();
    fetchStats();
    const interval = setInterval(() => {
      fetchBannedClinics();
      fetchStats();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filtered = clinics.filter(
    (c) =>
      c.clinic_name.toLowerCase().includes(search.toLowerCase()) ||
      c.clinic_id.toString().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white shadow-lg w-full    mx-auto rounded-xl overflow-hidden border p-4 sm:p-6 border-gray-300">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-10 mb-6">
        {/* Search Bar */}
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
            <span>Veterinarians</span>
            <span>
              <img src="/dropdown.png" alt="Dropdown" className="w-3 sm:w-4" />
            </span>
          </button>

          {open && (
            <div className="absolute top-full left-0 mt-1 w-36 sm:w-40 bg-white border border-gray-300 rounded-md shadow-md z-10">
              <ul className="py-1 text-xs sm:text-sm">
                <li
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate("/admin_bannedusers"); // navigate inside AdminLayout
                    setOpen(false); // close the dropdown
                  }}
                >
                  Pet Owners
                </li>
                <li
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate("/admin_bannedfreelance"); // navigate inside AdminLayout
                    setOpen(false); // close the dropdown
                  }}
                >
                  Freelance Vets
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="flex space-x-4 sm:space-x-6 justify-center">
          <div className="bg-gray-300 px-3 sm:px-4 py-2 w-32 sm:w-40 rounded-[16px] sm:rounded-[20px] text-center">
            <h2 className="text-lg sm:text-xl font-bold">
              {stats.clinicsCount}
            </h2>
            <p className="text-sm sm:text-lg">Clinics</p>
          </div>

          <div className="bg-gray-300 px-3 sm:px-4 py-2 w-32 sm:w-40 rounded-[16px] sm:rounded-[20px] text-center">
            <h2 className="text-lg sm:text-xl font-bold">
              {stats.petOwnersCount}
            </h2>
            <p className="text-sm sm:text-lg">Pet Owners</p>
          </div>
        </div>
      </div>

      {/* Table (scrollable on mobile) */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr className="bg-[#989898] text-white text-left">
              <th className="px-4 py-2 font-regular">Clinic</th>
              <th className="px-4 py-2 font-regular">ID</th>
              <th className="px-4 py-2 font-regular">Phone</th>
              <th className="px-4 py-2 font-regular">Email</th>
              <th className="px-4 py-2 font-regular">Evidence</th>
              <th className="px-4 py-2 font-regular">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-[#D9D9D9]" : "bg-white"}
              >
                <td className="px-4 py-2">{c.clinic_name}</td>
                <td className="px-4 py-2">{c.clinic_id}</td>
                <td className="px-4 py-2">{c.phone_number}</td>
                <td className="px-4 py-2 text-blue-600 underline cursor-pointer">
                  {c.email}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleViewReason(c)}
                    className="bg-[#8D8C8C] text-black px-3 py-1 rounded-full text-xs sm:text-sm"
                  >
                    View
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleUnban(c.owner_id, c.clinic_name)}
                    className="bg-[#FC7C7C] text-[#8D0002] px-3 py-1 rounded-full text-xs sm:text-sm"
                  >
                    Unban
                  </button>
                </td>
              </tr>
            ))}

            {/* Empty Rows */}
            {Array(5 - filtered.length)
              .fill(null)
              .map((_, i) => (
                <tr
                  key={`empty-${i}`}
                  className={i % 2 === 0 ? "bg-white" : "bg-[#D9D9D9]"}
                >
                  <td colSpan="6" className="h-12"></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && selectedClinic && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[400px] shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Ban Reason for {selectedClinic.clinic_name}
            </h2>
            <p className="mb-4">{selectedClinic.ban_reason}</p>

            <div className="mb-4">
              <p className="font-medium mb-1">Evidence Image:</p>
              {(() => {
                let images = [];

                if (selectedClinic?.evidence_image) {
                  try {
                    // Try to parse JSON array (if it's like ["url1", "url2"])
                    images = JSON.parse(selectedClinic.evidence_image);
                  } catch {
                    // If parsing fails, treat it as a single URL
                    images = [selectedClinic.evidence_image];
                  }
                }

                return images.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {images.map((url, idx) => (
                      <img
                        key={idx}
                        src={url}
                        alt={`Evidence ${idx + 1}`}
                        className="w-24 h-24 object-cover rounded-lg border border-gray-300 shadow-sm cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => window.open(url, "_blank")}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    No evidence image provided.
                  </p>
                );
              })()}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin_BannedVet;
