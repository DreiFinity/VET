import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [showPicker, setShowPicker] = useState(false);
  const [tempMonth, setTempMonth] = useState(currentDate.month());
  const [tempYear, setTempYear] = useState(currentDate.year());

  const startOfMonth = currentDate.startOf("month");
  const startDay = startOfMonth.day();
  const daysInMonth = currentDate.daysInMonth();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const applySelection = () => {
    setCurrentDate(dayjs().year(tempYear).month(tempMonth));
    setShowPicker(false);
  };

  return (
    <div className="mt-10 w-full max-w-[900px] h-[500px]  rounded-[13px] pt-[5px] pb-[2px] bg-white shadow-md px-4 relative">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div
          onClick={() => setShowPicker(!showPicker)}
          className="flex items-center space-x-1 text-black hover:opacity-80 cursor-pointer"
        >
          <span className="font-bold text-[16px]">
            {currentDate.format("MMMM YYYY")}
          </span>
          <ChevronRight
            size={18}
            strokeWidth={2}
            className={`text-blue-500 transition-transform duration-200 ${
              showPicker ? "rotate-270" : "rotate-90"
            }`}
          />
        </div>
        <div className="flex items-center space-x-2 text-blue-500">
          <button
            onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
          <button onClick={() => setCurrentDate(currentDate.add(1, "month"))}>
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Month-Year Picker */}
      {showPicker && (
        <div className="absolute top-10 left-4 bg-white border rounded-lg shadow-lg p-3 z-10">
          <div className="flex flex-col gap-2">
            <select
              value={tempMonth}
              onChange={(e) => setTempMonth(Number(e.target.value))}
              className="border rounded p-1"
            >
              {monthNames.map((m, idx) => (
                <option key={m} value={idx}>
                  {m}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={tempYear}
              onChange={(e) => setTempYear(Number(e.target.value))}
              className="border rounded p-1 w-24"
            />
            <button
              onClick={applySelection}
              className="bg-blue-500 text-white rounded p-1 hover:bg-blue-600"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1 text-center text-[13px] font-sf mt-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
          <div key={i} className="text-gray-500 font-semibold py-1">
            {d}
          </div>
        ))}
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <div
            key={day}
            className="text-[20px] font-medium font-sf rounded-full p-1 cursor-pointer hover:bg-gray-200"
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
