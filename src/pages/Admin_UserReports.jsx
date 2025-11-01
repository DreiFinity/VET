import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const VITE_API_BASE1 = import.meta.env.VITE_API_BASE;

const Admin_UserReports = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [reports, setReports] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ text: "", image: "" });
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState("client"); // Default: Pet Owners
  const [stats, setStats] = useState({ petOwnersCount: 0, clinicsCount: 0 });

  // Fetch reports from backend based on role
  const fetchReports = async (role = "client") => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${VITE_API_BASE1}/api/user-reports/${role}`
      );
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports(selectedRole);
    fetchStats();
  }, [selectedRole]);

  const filteredReports = reports.filter(
    (r) =>
      r.reported_user_name?.toLowerCase().includes(search.toLowerCase()) ||
      r.reporter_user_name?.toLowerCase().includes(search.toLowerCase()) ||
      r.evidence_text?.toLowerCase().includes(search.toLowerCase()) ||
      r.reported_user_id.toString().includes(search) ||
      r.reporter_user_id.toString().includes(search)
  );

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${VITE_API_BASE1}/api/stats`);
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  // ✅ Ban user handler (passes evidence text and image)
  const handleBan = async (
    report_id,
    reported_user_name,
    reported_user_id,
    evidence_text,
    evidence_image
  ) => {
    try {
      const res = await axios.put(`${VITE_API_BASE1}/api/user-reports/ban`, {
        reported_user_id,
        evidence_text,
        evidence_image,
      });

      alert(`Successfully banned ${reported_user_name}`);

      // ✅ Update UI instantly
      setReports((prev) =>
        prev.map((r) =>
          r.reported_user_id === reported_user_id
            ? { ...r, is_banned: true }
            : r
        )
      );
    } catch (error) {
      console.error("Error banning user:", error);
      alert(error.response?.data?.message || "Failed to ban user.");
    }
  };

  const handleShowEvidence = (text, image) => {
    let parsedImage = image;
    try {
      if (typeof image === "string" && image.startsWith("[")) {
        parsedImage = JSON.parse(image);
      }
    } catch (err) {
      console.error("Error parsing image JSON:", err);
    }
    setModalContent({ text, image: parsedImage });
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  if (loading) return <p>Loading reports...</p>;

  return (
    <div className="bg-white shadow-lg w-full mx-auto rounded-xl overflow-hidden border p-4 sm:p-6 border-gray-300">
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
            <span>
              <span>
                {selectedRole === "client"
                  ? "Pet Owners"
                  : selectedRole === "clinic_owner"
                  ? "Clinic Owners"
                  : selectedRole === "veterinarian"
                  ? "Veterinarians"
                  : "Unknown Role"}
              </span>
            </span>
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
                    setSelectedRole("client");
                    setOpen(false);
                  }}
                >
                  Pet Owners
                </li>
                <li
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedRole("clinic_owner");
                    setOpen(false);
                  }}
                >
                  Clinic Owners
                </li>
                <li
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedRole("veterinarian");
                    setOpen(false);
                  }}
                >
                  Veterinaries
                </li>
              </ul>
            </div>
          )}
        </div>

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
              <th className="px-4 py-2">Reported Users</th>
              <th className="px-4 py-2">User ID</th>
              <th className="px-4 py-2">Reporter</th>
              <th className="px-4 py-2">UserID</th>
              <th className="px-4 py-2">Evidence</th>
              <th className="px-4 py-2">Date Reported</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredReports.map((report, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-[#D9D9D9]" : "bg-white"}
              >
                <td className="px-4 py-2">{report.reported_user_name}</td>
                <td className="px-4 py-2">{report.reported_user_id}</td>
                <td className="px-4 py-2">{report.reporter_user_name}</td>
                <td className="px-4 py-2">{report.reporter_user_id}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-blue-200 text-blue-600 px-2 py-1 rounded-full text-xs sm:text-sm"
                    onClick={() =>
                      handleShowEvidence(
                        report.evidence_text,
                        report.evidence_image
                      )
                    }
                  >
                    View
                  </button>
                </td>
                <td className="px-4 py-2 text-blue-600 underline cursor-pointer">
                  {new Date(report.date_reported).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  {report.is_banned ? (
                    <button
                      disabled
                      className="bg-gray-300 text-gray-600 px-3 py-1 rounded-full text-xs sm:text-sm cursor-not-allowed"
                    >
                      Banned
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleBan(
                          report.report_id,
                          report.reported_user_name,
                          report.reported_user_id,
                          report.evidence_text,
                          report.evidence_image
                        )
                      }
                      className="bg-red-200 text-red-600 px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-red-300"
                    >
                      Ban
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Evidence Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] sm:w-[500px] relative">
            <h2 className="text-lg font-bold mb-4">Evidence</h2>
            <p className="mb-2">{modalContent.text}</p>
            {modalContent.image &&
              (Array.isArray(modalContent.image)
                ? modalContent.image.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Evidence ${idx + 1}`}
                      className="w-full rounded mb-2"
                    />
                  ))
                : typeof modalContent.image === "string" &&
                  modalContent.image.startsWith("[")
                ? JSON.parse(modalContent.image).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Evidence ${idx + 1}`}
                      className="w-full rounded mb-2"
                    />
                  ))
                : modalContent.image && (
                    <img
                      src={modalContent.image}
                      alt="Evidence"
                      className="w-full rounded"
                    />
                  ))}

            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-200 text-red-600 px-2 py-1 rounded-full"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin_UserReports;
