import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const VITE_API_BASE1 = import.meta.env.VITE_API_BASE;

const Admin_Veterinaries = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [clinics, setClinics] = useState([]);
  const [stats, setStats] = useState({ petOwnersCount: 0, clinicsCount: 0 });
  const navigate = useNavigate();

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [banReason, setBanReason] = useState("");

  useEffect(() => {
    fetchClinics();
    fetchStats();

    const interval = setInterval(() => {
      fetchClinics();
      fetchStats();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchClinics = async () => {
    try {
      const res = await axios.get(`${VITE_API_BASE1}/api/clinics`);
      setClinics(res.data);
    } catch (err) {
      console.error("Error fetching clinics:", err);
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

  // Open modal
  const openBanModal = (clinic) => {
    setSelectedClinic(clinic);
    setBanReason("");
    setShowModal(true);
  };

  // Confirm ban with reason
  const confirmBan = async () => {
    if (!banReason.trim()) {
      alert("Please provide a reason for banning.");
      return;
    }

    try {
      await axios.put(
        `${VITE_API_BASE1}/api/clinics/ban/${selectedClinic.owner_id}`,
        { reason: banReason }
      );

      alert(`${selectedClinic.clinic_name} has been banned.`);
      setShowModal(false);
      fetchClinics();
    } catch (err) {
      console.error("Ban failed:", err);
      alert("Failed to ban user.");
    }
  };

  const filteredClinics = clinics.filter(
    (u) =>
      u.clinic_name.toLowerCase().includes(search.toLowerCase()) ||
      u.clinic_id.toString().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white shadow-lg w-full   mx-auto rounded-xl border p-4 sm:p-6 border-gray-300 overflow-x-auto">
      {/* Search & Filters */}
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

        {/* Dropdown */}
        <div className="relative mb-4 sm:mb-8">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between w-36 sm:w-40 px-3 py-1 border border-gray-400 rounded-md shadow-sm bg-white text-xs sm:text-sm font-medium"
          >
            <span>Veterinaries</span>
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
                    navigate("/admin_petowners"); // navigate inside AdminLayout
                    setOpen(false); // close the dropdown
                  }}
                >
                  Pet Owners
                </li>
                <li
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate("/admin_freelance"); // navigate inside AdminLayout
                    setOpen(false); // close the dropdown
                  }}
                >
                  Freelance Vets
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex space-x-4 sm:space-x-6 justify-center">
          <div className="bg-gray-300 px-3 sm:px-4 py-2 w-32 sm:w-40 rounded-[16px] text-center">
            <h2 className="text-lg sm:text-xl font-bold">
              {stats.clinicsCount}
            </h2>
            <p className="text-sm sm:text-lg">Clinics</p>
          </div>

          <div className="bg-gray-300 px-3 sm:px-4 py-2 w-32 sm:w-40 rounded-[16px] text-center">
            <h2 className="text-lg sm:text-xl font-bold">
              {stats.petOwnersCount}
            </h2>
            <p className="text-sm sm:text-lg">Pet Owners</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr className="bg-[#989898] text-white text-left">
              <th className="px-4 py-2 font-normal">Veterinary Clinic</th>
              <th className="px-4 py-2 font-normal">Veterinary ID</th>
              <th className="px-4 py-2 font-normal">Contact Number</th>
              <th className="px-4 py-2 font-normal">Email Address</th>
              <th className="px-4 py-2 font-normal">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredClinics.map((clinic, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-[#D9D9D9]" : "bg-white"}
              >
                <td className="px-4 py-2">{clinic.clinic_name}</td>
                <td className="px-4 py-2">{clinic.clinic_id}</td>
                <td className="px-4 py-2">{clinic.phone_number}</td>
                <td className="px-4 py-2 text-blue-600 underline cursor-pointer">
                  {clinic.email}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => openBanModal(clinic)}
                    disabled={clinic.is_banned}
                    className={`px-4 py-1 rounded-full font-medium ${
                      clinic.is_banned
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-red-200 text-red-600 hover:bg-red-300"
                    }`}
                  >
                    {clinic.is_banned ? "Banned" : "Ban"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[400px] shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Ban {selectedClinic?.clinic_name}
            </h2>
            <textarea
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)}
              placeholder="Enter ban reason..."
              className="w-full h-28 border border-gray-300 rounded-md p-2 mb-4"
            ></textarea>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmBan}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
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

export default Admin_Veterinaries;
