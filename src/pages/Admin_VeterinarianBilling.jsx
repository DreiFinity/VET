import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VITE_API_BASE1 = import.meta.env.VITE_API_BASE;

const Admin_VeterinarianBilling = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [billings, setBillings] = useState([]);
  const [stats, setStats] = useState({
    petOwnersCount: 0,
    clinicsCount: 0,
  });

  // 🧠 Fetch veterinarian billing data
  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const response = await axios.get(
          `${VITE_API_BASE1}/api/veterinarian/veterinarian-billing`
        );
        setBillings(response.data);
      } catch (error) {
        console.error("❌ Error fetching veterinarian billing data:", error);
      }
    };

    const fetchStats = async () => {
      try {
        const res = await axios.get(`${VITE_API_BASE1}/api/stats`);
        // adjust based on what your stats API returns
        setStats({
          petOwnersCount: res.data.petOwnersCount || 0,
          clinicsCount: res.data.clinicsCount || 0,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchBillingData();
    fetchStats();
  }, []);

  // 📅 Format readable date
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // 🔍 Filter veterinarians based on search input
  const filteredBillings = billings.filter(
    (b) =>
      b.vet_id?.toString().includes(search.toLowerCase()) ||
      b.vet_name?.toLowerCase().includes(search.toLowerCase()) ||
      b.email?.toLowerCase().includes(search.toLowerCase()) ||
      b.specialization?.toLowerCase().includes(search.toLowerCase()) ||
      b.plan_name?.toLowerCase().includes(search.toLowerCase()) ||
      b.status?.toLowerCase().includes(search.toLowerCase())
  );
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-lg w-full mx-auto rounded-xl overflow-hidden border p-4 sm:p-6 border-gray-300">
      {/* 🔝 Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-10 mb-6">
        {/* 🔍 Search Bar */}
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

        {/* 🧾 Dropdown / Filter Placeholder */}
        {/* Dropdown Button */}
        <div className="relative mb-4 sm:mb-8">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between w-36 sm:w-40 px-3 py-1 border border-gray-400 rounded-md shadow-sm bg-white text-xs sm:text-sm font-medium"
          >
            <span>Freelancers</span>
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
                    navigate("/billing"); // navigate inside AdminLayout
                    setOpen(false); // close the dropdown
                  }}
                >
                  Clinics
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

      {/* 🧾 Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] border-collapse">
          <thead>
            <tr className="bg-[#989898] text-white text-left">
              <th className="px-4 py-2 font-regular">Vet ID</th>
              <th className="px-4 py-2 font-regular">Name</th>
              <th className="px-4 py-2 font-regular">Email</th>
              <th className="px-4 py-2 font-regular">Specialization</th>
              <th className="px-4 py-2 font-regular">Employment Type</th>

              <th className="px-4 py-2 font-regular">Contact</th>
              <th className="px-4 py-2 font-regular">Plan</th>
              <th className="px-4 py-2 font-regular">Price</th>
              <th className="px-4 py-2 font-regular">Start Date</th>
              <th className="px-4 py-2 font-regular">Next Billing</th>
              <th className="px-4 py-2 font-regular">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredBillings.map((bill, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-[#D9D9D9]" : "bg-white"}
              >
                <td className="px-4 py-2">{bill.vet_id}</td>
                <td className="px-4 py-2">{bill.name}</td>
                <td className="px-4 py-2">{bill.email}</td>
                <td className="px-4 py-2">{bill.specialization}</td>
                <td className="px-4 py-2">{bill.employment_type}</td>

                <td className="px-4 py-2">{bill.contact_number}</td>
                <td className="px-4 py-2">{bill.plan_name}</td>
                <td className="px-4 py-2">{bill.price}</td>
                <td className="px-4 py-2 text-black">
                  {formatDate(bill.start_date)}
                </td>
                <td className="px-4 py-2 text-black">
                  {formatDate(bill.end_date)}
                </td>
                <td className="px-4 py-2">{bill.status}</td>
              </tr>
            ))}

            {/* Empty rows for layout balance */}
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <tr
                  key={`empty-${i}`}
                  className={i % 2 === 0 ? "bg-white" : "bg-[#D9D9D9]"}
                >
                  <td colSpan="12" className="h-10"></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin_VeterinarianBilling;
