import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Billing = () => {
  const [open, setOpen] = useState(false); // dropdown state
  const [search, setSearch] = useState(""); // search state

  const users = [
    {
      User: "jo CAPANG VETTER",
      UserID: "VC0000001",
      Details: "Monthly Plan",
      Plan_Duration: "3 Months",
      Amount: "600",
      Next_Billing: "11/04/2024",
      Status: "Paid",
    },
    {
      User: "jo CAPANG VETTER",
      UserID: "VC0000001",
      Details: "Monthly Plan",
      Plan_Duration: "3 Months",
      Amount: "600",
      Next_Billing: "11/04/2024",
      Status: "Paid",
    },
    {
      User: "jo CAPANG VETTER",
      UserID: "VC0000001",
      Details: "Monthly Plan",
      Plan_Duration: "3 Months",
      Amount: "600",
      Next_Billing: "11/04/2024",
      Status: "Paid",
    },
  ];

  const filteredUsers = users.filter(
    (u) =>
      u.User.toLowerCase().includes(search.toLowerCase()) ||
      u.UserID.toLowerCase().includes(search.toLowerCase()) ||
      u.Details.toLowerCase().includes(search.toLowerCase()) ||
      u.Plan_Duration.toLowerCase().includes(search.toLowerCase()) ||
      u.Next_Billing.toLowerCase().includes(search.toLowerCase()) ||
      u.Status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white shadow-lg w-full max-w-[1100px] mx-auto rounded-xl overflow-hidden border p-4 sm:p-6 border-gray-300">
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
            <span>Pet Owners</span>
            <span>
              <img src="./dropdown.png" alt="Dropdown" className="w-3 sm:w-4" />
            </span>
          </button>

          {open && (
            <div className="absolute top-full left-0 mt-1 w-36 sm:w-40 bg-white border border-gray-300 rounded-md shadow-md z-10">
              <ul className="py-1 text-xs sm:text-sm">
                <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                  Veterinaries
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="flex space-x-4 sm:space-x-6 justify-center">
          <div className="bg-gray-300 px-3 sm:px-4 py-2 w-32 sm:w-40 rounded-[16px] sm:rounded-[20px] text-center">
            <h2 className="text-lg sm:text-xl font-bold">20</h2>
            <p className="text-sm sm:text-lg">Clinics</p>
          </div>

          <div className="bg-gray-300 px-3 sm:px-4 py-2 w-32 sm:w-40 rounded-[16px] sm:rounded-[20px] text-center">
            <h2 className="text-lg sm:text-xl font-bold">100</h2>
            <p className="text-sm sm:text-lg">Pet Owners</p>
          </div>
        </div>
      </div>

      {/* Table (scrollable on mobile) */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="bg-[#989898] text-white text-left">
              <th className="px-4 py-2 font-regular">User</th>
              <th className="px-4 py-2 font-regular">User ID</th>
              <th className="px-4 py-2 font-regular">Details</th>
              <th className="px-4 py-2 font-regular">Plan Duration</th>
              <th className="px-4 py-2 font-regular">Amount</th>
              <th className="px-4 py-2 font-regular">Next Billing</th>
              <th className="px-4 py-2 font-regular">Status</th>
              <th className="px-4 py-2 font-regular">Transaction History</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-[#D9D9D9]" : "bg-white"}
              >
                <td className="px-4 py-2">{user.User}</td>
                <td className="px-4 py-2">{user.UserID}</td>
                <td className="px-4 py-2">{user.Details}</td>
                <td className="px-4 py-2">{user.Plan_Duration}</td>
                <td className="px-4 py-2">{user.Amount}</td>
                <td className="px-4 py-2 text-blue-600 underline cursor-pointer">
                  {user.Next_Billing}
                </td>
                <td className="px-4 py-2">{user.Amount}</td>
                <td className="px-4 py-2 justify-center">
                  <button className="bg-[#8D8C8C] text-black px-3 py-1 rounded-full text-xs sm:text-sm">
                    View
                  </button>
                </td>
              </tr>
            ))}

            {/* Empty Rows */}
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <tr
                  key={`empty-${i}`}
                  className={i % 2 === 0 ? "bg-white" : "bg-[#D9D9D9]"}
                >
                  <td colSpan="8" className="h-12"></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Billing;
