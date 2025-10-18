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
      <label className="text-xl font-bold">Today's Schedule</label>

      <div
        className={`transition-all duration-700 ease-in-out ${
          hasScrolled
            ? "flex flex-row space-x-4 items-start mt-6"
            : "block mt-6"
        }`}
      >
        {/* Table */}
        <div
          className={`transition-all duration-700 ${
            hasScrolled ? "w-2/3" : "w-full"
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr className="bg-[#989898] text-white text-left">
                  <th className="px-4 py-2">Time</th>
                  <th className="px-4 py-2">Customer Name</th>
                  <th className="px-4 py-2">Pet Name</th>
                  <th className="px-4 py-2">Reason</th>
                  <th className="px-4 py-2">Veterinarian</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
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
          className={`transition-all duration-700 ${
            hasScrolled ? "w-1/3 flex flex-col space-y-4" : "mt-6 space-y-4"
          }`}
        >
          <div
            className={`bg-white flex flex-col justify-start p-6 space-y-2 rounded-lg border border-gray-300 shadow-md ${
              hasScrolled ? "h-full" : "h-auto"
            }`}
          >
            <label className="font-bold text-xl">Today's Operation</label>
            <span>Appointments: 7</span>
            <span>Surgeries: 2</span>
            <span>Dental Care: 1</span>
            <span>Check up: 4</span>
          </div>

          <div
            className={`bg-white flex flex-col justify-start p-6 space-y-2 rounded-lg border border-gray-300 shadow-md ${
              hasScrolled ? "h-full" : "h-auto"
            }`}
          >
            <label className="font-bold text-xl">Weekly Statistics</label>
            <span>New Patients: 5</span>
            <span>Transferee: 3</span>
            <span>Weekly Visitor: 47</span>
          </div>

          <div
            className={`bg-white flex flex-col justify-start p-6 space-y-2 rounded-lg border border-gray-300 shadow-md ${
              hasScrolled ? "h-full" : "h-auto"
            }`}
          >
            <label className="font-bold text-xl">Staffs</label>
            <span>Total Staff: 6</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="flex flex-row space-x-6 mt-10 justify-center">
        <div className="bg-white rounded-xl shadow-md p-4 w-120">
          <h2 className="text-center font-bold text-lg mb-2">
            Type of Pet admitted to Clinic
          </h2>
          <PieChart width={400} height={250}>
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
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 w-120">
          <h2 className="text-center font-bold text-lg mb-2">
            Purpose of Visit in past weeks
          </h2>
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
                  fill={COLORS1[index % COLORS1.length]}
                />
              ))}
            </Pie>
            <PieTooltip />
            <PieLegend />
          </PieChart>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-2xl mt-10 mx-auto">
        <h2 className="text-center font-bold text-lg mb-2">
          Customer From Appointment
        </h2>
        <ResponsiveContainer width="100%" height={400}>
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
