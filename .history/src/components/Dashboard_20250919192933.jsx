import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Dashboard = () => {
  const [open, setOpen] = useState(false); // dropdown state
  const [search, setSearch] = useState(""); // search state

  const users = [
    {
      lastName: "Bangon",
      firstName: "Horgie",
      userId: "PO0000001",
      pets: 3,
      contact: "09123456789",
      email: "horgie6723@gmail.com",
    },
    {
      lastName: "Lou",
      firstName: "Jack",
      userId: "PO0000002",
      pets: 3,
      contact: "09123456789",
      email: "J.Lou2902@gmail.com",
    },
    {
      lastName: "Ryan",
      firstName: "Bayang",
      userId: "PO0000003",
      pets: 2,
      contact: "09123456789",
      email: "Bayang123@gmail.com",
    },
  ];

  const filteredUsers = users.filter(
    (u) =>
      u.lastName.toLowerCase().includes(search.toLowerCase()) ||
      u.firstName.toLowerCase().includes(search.toLowerCase()) ||
      u.userId.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white shadow-lg w-full max-w-[1100px] mx-auto rounded-xl overflow-hidden border p-4 sm:p-6 border-gray-300">
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
                <td className="px-4 py-2 text-center">
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

export default Dashboard;
