import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Admin_BannedUsers = () => {
  const [open, setOpen] = useState(false); // dropdown open/close
  const [search, setSearch] = useState(""); // search text
  const [selected, setSelected] = useState("Pet Owners"); // dropdown selection

  // Sample data for Pet Owners and Veterinaries
  const petOwners = [
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

  const veterinaries = [
    {
      lastName: "Smith",
      firstName: "Anna",
      userId: "VET0001",
      pets: "-",
      contact: "09112223344",
      email: "anna.smith@vet.com",
    },
    {
      lastName: "Doe",
      firstName: "John",
      userId: "VET0002",
      pets: "-",
      contact: "09113334455",
      email: "john.doe@vet.com",
    },
  ];

  // Select users based on dropdown
  const users = selected === "Pet Owners" ? petOwners : veterinaries;

  // Filtered users based on search
  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.userId.toLowerCase().includes(search.toLowerCase())
  );

  // Stats numbers
  const stats =
    selected === "Pet Owners"
      ? { clinics: 20, totalUsers: petOwners.length }
      : { clinics: 5, totalUsers: veterinaries.length };

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
            <span>{selected}</span>
            <span>
              <img src="/dropdown.png" alt="Dropdown" className="w-3 sm:w-4" />
            </span>
          </button>

          {open && (
            <div className="absolute top-full left-0 mt-1 w-36 sm:w-40 bg-white border border-gray-300 rounded-md shadow-md z-10">
              <ul className="py-1 text-xs sm:text-sm">
                {["Pet Owners", "Veterinaries"].map((option) => (
                  <li
                    key={option}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelected(option);
                      setOpen(false);
                      setSearch(""); // reset search on change
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="flex space-x-4 sm:space-x-6 justify-center">
          <div className="bg-gray-300 px-3 sm:px-4 py-2 w-32 sm:w-40 rounded-[16px] sm:rounded-[20px] text-center">
            <h2 className="text-lg sm:text-xl font-bold">{stats.clinics}</h2>
            <p className="text-sm sm:text-lg">Clinics</p>
          </div>

          <div className="bg-gray-300 px-3 sm:px-4 py-2 w-32 sm:w-40 rounded-[16px] sm:rounded-[20px] text-center">
            <h2 className="text-lg sm:text-xl font-bold">{stats.totalUsers}</h2>
            <p className="text-sm sm:text-lg">{selected}</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr className="bg-[#989898] text-white text-left">
              <th className="px-4 py-2 font-normal">Last Name</th>
              <th className="px-4 py-2 font-normal">First Name</th>
              <th className="px-4 py-2 font-normal">User ID</th>
              <th className="px-4 py-2 font-normal">Pets Registered</th>
              <th className="px-4 py-2 font-normal">Contact Number</th>
              <th className="px-4 py-2 font-normal">Email Address</th>
              <th className="px-4 py-2 font-normal">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-[#D9D9D9]" : "bg-white"}
              >
                <td className="px-4 py-2">{user.lastName}</td>
                <td className="px-4 py-2">{user.firstName}</td>
                <td className="px-4 py-2">{user.userId}</td>
                <td className="px-4 py-2">{user.pets}</td>
                <td className="px-4 py-2">{user.contact}</td>
                <td className="px-4 py-2 text-blue-600 underline cursor-pointer">
                  {user.email}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => alert(`Banned ${user.firstName}`)}
                    className="bg-red-200 text-red-600 px-3 py-1 rounded-full text-xs sm:text-sm"
                  >
                    Ban
                  </button>
                </td>
              </tr>
            ))}

            {/* Empty rows for consistent table height */}
            {Array(Math.max(0, 5 - filteredUsers.length))
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
