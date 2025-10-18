import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Admin_BannedUsers = () => {
  const [open, setOpen] = useState(false); // dropdown state
  const [search, setSearch] = useState(""); // search state

  const users = [
    {
      lName: "weadaw",
      fName: "wead",
      Id: "PO0000001",
      Pets: 3,
      contact: "09123456789",
      Email: "horgie6723@gmail.com",
    },
    {
      lName: "Lawdawd",
      fName: "Jaawdak",
      Id: "PO0000002",
      Pets: 3,
      contacts: "09123456789",
      Email: "J.Lou2902@gmail.com",
    },
    {
      lName: "awdda",
      fName: "Bawdadg",
      Id: "PO0000003",
      Pets: 2,
      contacts: "09123456789",
      Email: "Bayang123@gmail.com",
    },
  ];

  const filteredUsers = users.filter(
    (u) =>
      u.lName.toLowerCase().includes(search.toLowerCase()) ||
      u.fName.toLowerCase().includes(search.toLowerCase()) ||
      u.Id.toLowerCase().includes(search.toLowerCase()) ||
      u.Email.toLowerCase().includes(search.toLowerCase())
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
              <img src="/dropdown.png" alt="Dropdown" className="w-3 sm:w-4" />
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
              <th className="px-4 py-2 font-regular">Last Name</th>
              <th className="px-4 py-2 font-regular">First Name</th>
              <th className="px-4 py-2 font-regular">User ID</th>
              <th className="px-4 py-2 font-regular">Pets Registered</th>
              <th className="px-4 py-2 font-regular">Contact Number</th>
              <th className="px-4 py-2 font-regular">Email Address</th>
              <th className="px-4 py-2 font-regular">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-[#D9D9D9]" : "bg-white"}
              >
                <td className="px-4 py-2">{user.lName}</td>
                <td className="px-4 py-2">{user.fName}</td>
                <td className="px-4 py-2">{user.Id}</td>
                <td className="px-4 py-2">{user.Pets}</td>
                <td className="px-4 py-2">{user.contact}</td>
                <td className="px-4 py-2 text-blue-600 underline cursor-pointer">
                  {user.Email}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => alert(`Banned ${user.fName}`)}
                    className="bg-red-200 text-red-600 px-3 py-1 rounded-full text-xs sm:text-sm"
                  >
                    Ban
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
                  <td colSpan="7" className="h-12"></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin_BannedUsers;
