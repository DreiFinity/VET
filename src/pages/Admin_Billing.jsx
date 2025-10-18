import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const VITE_API_BASE1 = import.meta.env.VITE_API_BASE;

const Billing = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [billings, setBillings] = useState([]);
  const [stats, setStats] = useState({ petOwnersCount: 0, clinicsCount: 0 });

  // 🧠 Fetch billing data
  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const response = await axios.get(`${VITE_API_BASE1}/api/billing`);
        setBillings(response.data);
      } catch (error) {
        console.error("Error fetching billing data:", error);
      }
    };

    fetchBillingData();
    fetchStats();
  }, []);
  const fetchStats = async () => {
    try {
      const res = await axios.get(`${VITE_API_BASE}/api/stats`);
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };
  // 📅 Format date as "February 15, 2005"
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // 🔍 Filter based on search input
  const filteredBillings = billings.filter(
    (b) =>
      b.clinic_id?.toString().includes(search.toLowerCase()) ||
      b.clinic_name?.toLowerCase().includes(search.toLowerCase()) ||
      b.plan_name?.toLowerCase().includes(search.toLowerCase()) ||
      b.price?.toString().includes(search.toLowerCase()) ||
      b.next_billing?.toLowerCase().includes(search.toLowerCase()) ||
      b.status?.toLowerCase().includes(search.toLowerCase())
  );

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
            <span>Clinics</span>
            <span></span>
          </button>
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
              <th className="px-4 py-2 font-regular">Clinic ID</th>
              <th className="px-4 py-2 font-regular">Clinic Name</th>
              <th className="px-4 py-2 font-regular">Plan</th>
              <th className="px-4 py-2 font-regular">Price</th>
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
                <td className="px-4 py-2">{bill.clinic_id}</td>
                <td className="px-4 py-2">{bill.clinic_name}</td>
                <td className="px-4 py-2">{bill.plan_name}</td>
                <td className="px-4 py-2">{bill.price}</td>
                <td className="px-4 py-2 text-black ">
                  {formatDate(bill.end_date)}
                </td>
                <td className="px-4 py-2">{bill.status}</td>
              </tr>
            ))}

            {/* Empty Rows for spacing */}
            {Array(5)
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
    </div>
  );
};

export default Billing;
