import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import dayjs from "dayjs";

export default function VetSchedule() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedVet, setSelectedVet] = useState("Select Veterinarian");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedBlockedIndex, setSelectedBlockedIndex] = useState(null);

  const appointments = [
    {
      time: "10:30 AM - 11:00 AM",
      customer: "Jorgie S Macron",
      petname: "Horgie Jr.",
      reason: "Check Up",
      vet: "Dr. Jorge M. Martinez",
      status: "Complete",
    },
    {
      time: "11:00 AM - 11:30 AM",
      customer: "Jack S. Sparrow",
      petname: "Garfield",
      reason: "Surgery",
      vet: "Dr. Jorge M. Martinez",
      status: "In-progress",
    },
    {
      time: "11:30 AM - 12:00 PM",
      customer: "Jorgie S Macron",
      petname: "Blacky",
      reason: "Dental Care",
      vet: "Dr. Jorge M. Martinez",
      status: "Waiting",
    },
  ];

  const blockedTimes = ["12:00 PM - 12:30 PM", "12:30 PM - 1:00 PM"];
  const openTimes = ["1:00 PM - 2:00 PM", "2:00 PM - 3:00 PM"];

  const veterinarians = [
    "Dr. Jorge M. Martinez",
    "Dr. Sarah T. Lin",
    "Dr. Amelia Rodriguez",
    "Dr. John D. Smith",
  ];

  const statusColors = {
    Complete: "bg-blue-200 text-blue-800",
    "In-progress": "bg-green-200 text-green-800",
    Waiting: "bg-yellow-200 text-yellow-800",
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const handleVetSelect = (vet) => {
    setSelectedVet(vet);
    setDropdownOpen(false);
  };
  const handleBlockedClick = (index) => {
    setSelectedBlockedIndex(index === selectedBlockedIndex ? null : index);
  };

  const handleUnblock = (time) => {
    alert(`Unblocked time: ${time}`);
    // You can implement actual state logic to remove this from blockedTimes if needed.
  };

  const startOfMonth = currentDate.startOf("month");
  const startDay = startOfMonth.day();
  const daysInMonth = currentDate.daysInMonth();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6 mx-auto max-w-[1140px] w-full">
        {/* Sidebar */}
        <div className="flex flex-col items-center gap-4 w-full lg:w-[340px] relative">
          {/* Calendar Card */}
          <div className="w-full h-auto rounded-[13px] pt-[5px] pb-[2px] bg-white shadow-md px-4">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-1 text-black hover:opacity-80 cursor-pointer">
                <span className="font-bold text-[16px]">
                  {currentDate.format("MMMM YYYY")}
                </span>
                <ChevronRight
                  size={18}
                  strokeWidth={2}
                  className="text-blue-500 rotate-90"
                />
              </div>
              <div className="flex items-center space-x-2 text-blue-500">
                <button
                  onClick={() =>
                    setCurrentDate(currentDate.subtract(1, "month"))
                  }
                >
                  <ChevronLeft size={20} strokeWidth={2.5} />
                </button>
                <button
                  onClick={() => setCurrentDate(currentDate.add(1, "month"))}
                >
                  <ChevronRight size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1 text-center text-[13px] font-sf">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
                <div key={i} className="text-gray-500 font-semibold py-1">
                  {d}
                </div>
              ))}
              {Array.from({ length: startDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                (day) => (
                  <div
                    key={day}
                    className="text-[16px] font-medium rounded-full p-1 cursor-pointer hover:bg-gray-200"
                  >
                    {day}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Veterinarian Dropdown */}
          <div className="relative w-full">
            <button
              onClick={toggleDropdown}
              className="w-full bg-[#D9D9D9] border py-2 px-4 rounded-xl shadow text-center font-semibold flex justify-between items-center"
            >
              <span>{selectedVet}</span>
              <ChevronDown size={18} />
            </button>
            {dropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow">
                {veterinarians.map((vet, index) => (
                  <div
                    key={index}
                    onClick={() => handleVetSelect(vet)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {vet}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Block Time Button */}
          <button className="w-full bg-[#D9D9D9] py-2 px-4 rounded-xl text-center font-semibold">
            Block Time
          </button>
        </div>

        {/* Appointment Table */}
        <div className="bg-white rounded-[25px] shadow-md p-4 w-full overflow-x-auto">
          <div className="font-roboto text-[12px] font-normal">
            <table className="min-w-[700px] md:min-w-full w-full text-sm">
              <thead className="bg-gray-400 text-white font-semibold">
                <tr>
                  <th className="text-left px-4 py-2">Time</th>
                  <th className="text-left px-4 py-2">Customer Name</th>
                  <th className="text-left px-4 py-2">Petname</th>
                  <th className="text-left px-4 py-2">Reason</th>
                  <th className="text-left px-4 py-2">Veterinarian</th>
                  <th className="text-left px-4 py-2">Status</th>
                  <th className="text-center px-2 py-2">
                    <input type="checkbox" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((app, index) => (
                  <tr
                    key={index}
                    className="border-b odd:bg-white even:bg-[#D9D9D9]"
                  >
                    <td className="px-4 py-2 whitespace-nowrap">{app.time}</td>
                    <td className="px-4 py-2">{app.customer}</td>
                    <td className="px-4 py-2 text-blue-600">{app.petname}</td>
                    <td className="px-4 py-2">{app.reason}</td>
                    <td className="px-4 py-2">{app.vet}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          statusColors[app.status]
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="text-center">
                      <input type="checkbox" />
                    </td>
                  </tr>
                ))}

                {/* Blocked Time Rows */}
                {blockedTimes.map((time, idx) => (
                  <tr
                    key={`blocked-${idx}`}
                    className="bg-gray-200 cursor-pointer"
                    onClick={() => handleBlockedClick(idx)}
                  >
                    <td className="px-4 py-2" colSpan={7}>
                      {time} -{" "}
                      <span className="text-gray-600 font-semibold">
                        Blocked
                      </span>
                      {/* Show Unblock Button if selected */}
                      {selectedBlockedIndex === idx && (
                        <div className="mt-2">
                          <button
                            className="mt-2 px-4 py-1 bg-red-500 text-white text-xs font-semibold rounded-full hover:bg-red-600 transition"
                            onClick={() => handleUnblock(time)}
                          >
                            Unblock
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}

                {/* Open Times */}
                {openTimes.map((time, idx) => (
                  <tr key={`open-${idx}`} className="bg-gray-100">
                    <td className="px-4 py-2" colSpan={7}>
                      {time} -{" "}
                      <span className="text-gray-600 font-semibold">Open</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
