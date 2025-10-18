import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as PieTooltip,
  Legend as PieLegend,
} from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as BarTooltip,
  Legend as BarLegend,
} from "recharts";

const Dashboard = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 && !hasScrolled) {
        setHasScrolled(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

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
      Time: "11:00 AM - 12:00 PM",
      CustomerName: "Ana",
      PetName: "KITTY",
      Reason: "GROOMING",
      Veterinarian: "Dr. Smith",
      Status: "Inprogress",
    },
    {
      Time: "1:00 PM - 2:00 PM",
      CustomerName: "Paul",
      PetName: "BRUNO",
      Reason: "VACCINATION",
      Veterinarian: "Dr. Lee",
      Status: "Pending",
    },
  ];

  const data = [
    { name: "Cats", value: 37.5 },
    { name: "Dogs", value: 37.5 },
    { name: "Others", value: 25 },
  ];
  const data1 = [
    { name: "Check up", value: 28 },
    { name: "Grooming", value: 30 },
    { name: "Vaccination", value: 25 },
    { name: "Admission", value: 17 },
  ];
  const data3 = [
    { day: "Monday", didNotShow: 5, visited: 10 },
    { day: "Tuesday", didNotShow: 3, visited: 14 },
    { day: "Wednesday", didNotShow: 2, visited: 8 },
    { day: "Thursday", didNotShow: 4, visited: 9 },
    { day: "Friday", didNotShow: 3, visited: 17 },
    { day: "Saturday", didNotShow: 1, visited: 20 },
  ];

  const COLORS = ["#4fd1c5", "#63b3ed", "#234e52"];
  const COLORS1 = ["#4c6ef5", "#7c3aed", "#1e3a8a", "#93c5fd"];

  return (
    <div className="bg-white shadow-lg w-full max-w-[1300px] mx-auto rounded-xl overflow-hidden border p-4 sm:p-6 border-gray-300">
      <label
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontWeight: 400,
          fontStyle: "normal", // "Regular" in CSS is just "normal"
          fontSize: "30px",
          lineHeight: "34px",
          letterSpacing: "0%",
        }}
      >
        Today's Schedule
      </label>

      <div
        className={`transition-all duration-700 ease-in-out mt-6 ${
          hasScrolled
            ? "md:flex md:flex-row md:space-x-4 md:items-start"
            : "block"
        }`}
      >
        {/* Table */}
        <div
          className={`transition-all duration-700 ${
            hasScrolled ? "md:w-2/3 w-full" : "w-full"
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-sm sm:text-base">
              <thead>
                <tr className="bg-[#989898] text-white text-left">
                  <th className="px-2 sm:px-4 py-2">Time</th>
                  <th className="px-2 sm:px-4 py-2">Customer Name</th>
                  <th className="px-2 sm:px-4 py-2">Pet Name</th>
                  <th className="px-2 sm:px-4 py-2">Reason</th>
                  <th className="px-2 sm:px-4 py-2">Veterinarian</th>
                  <th className="px-2 sm:px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-[#D9D9D9]" : "bg-white"}
                  >
                    <td className="px-2 sm:px-4 py-2">{user.Time}</td>
                    <td className="px-2 sm:px-4 py-2">{user.CustomerName}</td>
                    <td className="px-2 sm:px-4 py-2">{user.PetName}</td>
                    <td className="px-2 sm:px-4 py-2">{user.Reason}</td>
                    <td className="px-2 sm:px-4 py-2">{user.Veterinarian}</td>
                    <td className="px-2 sm:px-4 py-2 text-center">
                      <button className="bg-[#B6DEFF] text-blue-500 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                        {user.Status}
                      </button>
                    </td>
                  </tr>
                ))}
                {/* keep table height stable */}
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

        {/* Cards */}
        <div
          className={`transition-all duration-700 mt-5 md:mt-0 ${
            hasScrolled
              ? "md:w-1/3 flex flex-col space-y-4"
              : "flex flex-col sm:flex-row sm:space-x-5 space-y-4 sm:space-y-0 justify-center"
          }`}
        >
          {/* Card 1 */}
          <div
            className={`bg-white flex flex-col justify-start p-6 sm:p-10 space-y-3 sm:space-y-5 rounded-lg border border-gray-300 shadow-md transition-all duration-700 ${
              hasScrolled ? "h-full w-full" : "w-full sm:w-70 h-64"
            }`}
          >
            <label className="font-bold text-lg sm:text-xl -mt-1 sm:-mt-3">
              Today's Operation
            </label>
            <label className="text-sm sm:text-md">Appointments:7</label>
            <label className="text-sm sm:text-md">Surgeries:2</label>
            <label className="text-sm sm:text-md">Dental Care:1</label>
            <label className="text-sm sm:text-md">Check up:4</label>
          </div>

          {/* Card 2 */}
          <div
            className={`bg-white flex flex-col justify-start p-6 sm:p-10 space-y-3 sm:space-y-5 rounded-lg border border-gray-300 shadow-md transition-all duration-700 ${
              hasScrolled ? "h-full w-full" : "w-full sm:w-70 h-64"
            }`}
          >
            <label className="font-bold text-lg sm:text-xl -mt-1 sm:-mt-3">
              Weekly Statistics
            </label>
            <label className="text-sm sm:text-md">New Patients:5</label>
            <label className="text-sm sm:text-md">Transferee:3</label>
            <label className="text-sm sm:text-md">Weekly Visitor:47</label>
          </div>

          {/* Card 3 */}
          <div
            className={`bg-white flex flex-col justify-start p-6 sm:p-10 space-y-3 sm:space-y-5 rounded-lg border border-gray-300 shadow-md transition-all duration-700 ${
              hasScrolled ? "h-full w-full" : "w-full sm:w-70 h-64"
            }`}
          >
            <label className="font-bold text-lg sm:text-xl -mt-1 sm:-mt-3">
              Staffs
            </label>
            <label className="text-sm sm:text-lg">Total Staff:6</label>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="flex flex-col lg:flex-row lg:space-x-6 mt-10 justify-center space-y-6 lg:space-y-0">
        <div className="bg-white rounded-xl shadow-md p-4 w-full lg:w-1/2">
          <h2 className="text-center font-bold text-base sm:text-lg mb-2">
            Type of Pet admitted to Clinic
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
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
              <PieTooltip />
              <PieLegend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 w-full lg:w-1/2">
          <h2 className="text-center font-bold text-base sm:text-lg mb-2">
            Purpose of Visit in past weeks
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
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
                    fill={COLORS1[index % COLORS1.length]}
                  />
                ))}
              </Pie>
              <PieTooltip />
              <PieLegend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-xl shadow-md p-4 w-full mt-10">
        <h2 className="text-center font-bold text-base sm:text-lg mb-2">
          Customer From Appointment
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data3}
            layout="vertical"
            margin={{ top: 10, right: 20, left: 40, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="day" type="category" />
            <BarTooltip />
            <BarLegend />
            <Bar dataKey="didNotShow" fill="#fca5a5" name="Did not Show up" />
            <Bar dataKey="visited" fill="#60a5fa" name="Visited the Clinic" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
