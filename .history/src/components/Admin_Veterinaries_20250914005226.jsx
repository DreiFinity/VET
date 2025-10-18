import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Admin_Veterinaries = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const veterinaries = [
    {
      clinic: "Jo Capang Vetter",
      id: "VC0000001",
      contact: "09123456789",
      email: "Jo_Capang_Vetter@gmail.com",
    },
    {
      clinic: "Andrei",
      id: "VC0000002",
      contact: "0946789446",
      email: "Jetter@gmail.com",
    },
    {
      clinic: "Vetter",
      id: "VC0000003",
      contact: "09112321321",
      email: "Jor@gmail.com",
    },
  ];

  const filtered = veterinaries.filter(
    (v) =>
      v.clinic.toLowerCase().includes(search.toLowerCase()) ||
      v.id.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white shadow-lg w-full max-w-[1100px] mx-auto rounded-xl border p-4 sm:p-6 border-gray-300 overflow-x-auto">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-10 mb-6">
        {/* Search */}
        <div className="flex items-center w-full sm:w-[562px] h-[42px] sm:h-[46px] bg-[#D9D9D9] rounded-full px-3 sm:px-4 py-2 shadow-md mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 outline-none text-sm sm:text-base bg-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="text-black w-5 h-5 sm:w-6 sm:h-6" />
        </div>

        {/* Dropdown */}
        <div className="relative mb-4 sm:mb-0">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between w-36 sm:w-40 px-3 py-1 border border-gray-400 rounded-md shadow-sm bg-white text-xs sm:text-sm font-medium"
          >
            <span>Veterinaries</span>
            <img src="./dropdown.png" alt="Dropdown" className="w-3 sm:w-4" />
          </button>

          {open && (
            <div className="absolute top-full left-0 mt-1 w-36 sm:w-40 bg-white border border-gray-300 rounded-md shadow-md z-10">
              <ul className="py-1 text-xs sm:text-sm">
                <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                  Pet Owners
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex space-x-4 sm:space-x-6 justify-center">
          <div className="bg-gray-300 px-4 py-2 w-32 sm:w-40 rounded-[20px] text-center">
            <h2 className="text-lg sm:text-xl font-bold">20</h2>
            <p className="text-sm sm:text-lg">Clinics</p>
          </div>

          <div className="bg-gray-300 px-4 py-2 w-32 sm:w-40 rounded-[20px] text-center">
            <h2 className="text-lg sm:text-xl font-bold">100</h2>
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
            {filtered.map((v, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-[#D9D9D9]" : "bg-white"}
              >
                <td className="px-4 py-2">{v.clinic}</td>
                <td className="px-4 py-2">{v.id}</td>
                <td className="px-4 py-2">{v.contact}</td>
                <td className="px-4 py-2 text-blue-600 underline cursor-pointer">
                  {v.email}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => alert(`Banned ${v.clinic}`)}
                    className="bg-red-200 text-red-600 px-3 py-1 rounded-full text-xs sm:text-sm"
                  >
                    Ban
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin_Veterinaries;
