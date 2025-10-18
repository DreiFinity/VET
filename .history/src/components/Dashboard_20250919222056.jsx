import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Dashboard = () => {
  const [open, setOpen] = useState(false); // dropdown state
  const [search, setSearch] = useState(""); // search state

  const users = [
    {
      Time: "10:00 AM - 11:00 AM",
      CustomerName: "Jorge",
      PetName: "HORGIE JR.",
      Reason: "CHECK-UP",
      Veterinarian: "Dr.Jorgie Y. Swertie",
      Status: "Complete",
    },
    {
      Time: "10:00 AM - 11:00 AM",
      CustomerName: "Jorge",
      PetName: "HORGIE JR.",
      Reason: "CHECK-UP",
      Veterinarian: "Dr.Jorgie Y. Swertie",
      Status: "Inprogress",
    },
    {
      Time: "10:00 AM - 11:00 AM",
      CustomerName: "Jorge",
      PetName: "HORGIE JR.",
      Reason: "CHECK-UP",
      Veterinarian: "Dr.Jorgie Y. Swertie",
      Status: "Pending",
    },
  ];

  const filteredUsers = users.filter(
    (u) =>
      u.Time.toLowerCase().includes(search.toLowerCase()) ||
      u.CustomerName.toLowerCase().includes(search.toLowerCase()) ||
      u.PetName.toLowerCase().includes(search.toLowerCase()) ||
      u.Reason.toLowerCase().includes(search.toLowerCase()) ||
      u.Veterinarian.toLowerCase().includes(search.toLowerCase()) ||
      u.Status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white shadow-lg w-full max-w-[1100px] mx-auto rounded-xl overflow-hidden border p-4 sm:p-6 border-gray-300">
      {/* Table (scrollable on mobile) */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="bg-[#989898] text-white text-left">
              <th className="px-4 py-2 font-regular">Time</th>
              <th className="px-4 py-2 font-regular">Customer Name</th>
              <th className="px-4 py-2 font-regular">Pet Name</th>
              <th className="px-4 py-2 font-regular">Reason</th>
              <th className="px-4 py-2 font-regular">Veterinarian</th>
              <th className="px-4 py-2 font-regular">Status</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-[#D9D9D9]" : "bg-white"}
              >
                <td className="px-4 py-2">{user.Time}</td>
                <td className="px-4 py-2">{user.CustomerName}</td>
                <td className="px-4 py-2">{user.PetName}</td>
                <td className="px-4 py-2">{user.Reason}</td>
                <td className="px-4 py-2">{user.Veterinarian}</td>
                <td className="px-4 py-2 text-center">
                  <button className="bg-[#B6DEFF] text-blue-500 px-3 py-1 rounded-full text-xs sm:text-sm">
                    {user.Status}
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

      <div className="bg-white w-32 h-64 flex flex-col justify-center rounded-lg border border-gray-300 shadow-md ">
        <label htmlFor="font-bold  ">Today's Operation</label>
      </div>
    </div>
  );
};

export default Dashboard;
