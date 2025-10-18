import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [open, setOpen] = useState(false); // dropdown state
  const [search, setSearch] = useState("");
  const data3 = [
    { day: "Monday", didNotShow: 5, visited: 10 },
    { day: "Tuesday", didNotShow: 3, visited: 14 },
    { day: "Wednesday", didNotShow: 2, visited: 8 },
    { day: "Thursday", didNotShow: 4, visited: 9 },
    { day: "Friday", didNotShow: 3, visited: 17 },
    { day: "Saturday", didNotShow: 1, visited: 20 },
  ]; // search state

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

  const data = [
    { name: "Cats", value: 37.5 },
    { name: "Dogs", value: 37.5 },
    { name: "Others", value: 37.5 },
  ];
  const data1 = [
    { name: "Check up", value: 28 },
    { name: "Grooming", value: 30 },
    { name: "Vaccination", value: 25 },
    { name: "Admission", value: 25 },
  ];

  // Colors for slices
  const COLORS = ["#4fd1c5", "#63b3ed", "#234e52"];
  const COLORS1 = ["#4c6ef5", "#7c3aed", "#1e3a8a", "#93c5fd"];

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

      <div className="flex flex-row space-x-5 mt-5">
        <div className="bg-white w-70 h-64 flex flex-col justify-start p-10  space-y-5 rounded-lg border border-gray-300 shadow-md ">
          <label htmlFor="" className="font-bold text-xl -mt-3 ">
            Today's Operation
          </label>
          <label htmlFor="" className="text-md">
            Appointments:7
          </label>
          <label htmlFor="" className="text-md">
            Surgeries:2
          </label>
          <label htmlFor="" className="text-md">
            Dental Care:1
          </label>
          <label htmlFor="" className="text-md">
            Check up:4
          </label>
        </div>

        <div className="bg-white w-70 h-64 flex flex-col justify-start p-10  space-y-5 rounded-lg border border-gray-300 shadow-md ">
          <label htmlFor="" className="font-bold text-xl -mt-3 ">
            Weekly Statistics
          </label>
          <label htmlFor="" className="text-md">
            New Patients:5
          </label>
          <label htmlFor="" className="text-md">
            Transferee:3
          </label>
          <label htmlFor="" className="text-md">
            Weekly Visitor:47
          </label>
        </div>

        <div className="bg-white w-70 h-64 flex flex-col justify-start p-10  space-y-5 rounded-lg border border-gray-300 shadow-md ">
          <label htmlFor="" className="font-bold text-xl -mt-3 ">
            Staffs
          </label>
          <label htmlFor="" className="text-lg">
            Total Staff:6
          </label>
        </div>
      </div>
      <div className="flex flex-row space-x-15 mt-10 justify-center">
        {/* Pie Chart for Pet Types */}
        <div className="bg-white rounded-xl mt-10 shadow-md p-4 w-80">
          {/* Chart Title */}
          <h2 className="text-center font-bold text-lg mb-2">
            Type of Pet admitted to Clinic
          </h2>
          {/* Pie Chart */}
          <PieChart width={300} height={250}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              dataKey="value"
              label={({ name, value }) => `${name} ${value}%`}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        {/* Bar Chart for Weekly No. of Purpose Visitors */}
        <div className="bg-white rounded-xl shadow-md p-4  w-120">
          {/* Chart Title */}
          <h2 className="text-center font-bold text-lg mb-2">
            Purpose of Visit in past weeks
          </h2>
          {/* Pie Chart */}
          <PieChart width={400} height={250}>
            <Pie
              data={data1}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              dataKey="value"
              label={({ name, value }) => `${name} ${value}%`}
            >
              {data1.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS1[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
      {/* Bar Chart for Customer From Appointment */}
      <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-2xl">
        <h2 className="text-center  font-bold text-lg mb-2">
          Customer From Appointment
        </h2>

        {/* Responsive container makes chart auto-fit parent width */}
        <ResponsiveContainer width="150%" height={400}>
          <BarChart
            data={data3}
            layout="vertical"
            margin={{ top: 10, right: 20, left: 40, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="day" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="didNotShow" fill="#fca5a5" name="Did not Show up" />
            <Bar dataKey="visited" fill="#60a5fa" name="Visited the Clinic" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
