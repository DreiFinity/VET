import Calendar from "./Calendar";
import React from "react";

const Reschedule = ({ onClose }) => {
  const slots = [
    "10:30 AM – 11:00 AM",
    "11:00 AM – 10:30 AM",
    "11:30 AM – 12:00 PM",
    "12:00 PM – 12:30 PM",
    "12:30 PM – 1:00 PM",
    "1:00 PM – 2:00 PM",
    "2:00 PM – 3:00 PM",
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent overflow-auto">
      <div className="bg-[#D9D9D9] w-full max-w-[984px] max-h-[80vh] h-auto shadow-md relative m-4 flex flex-col overflow-auto p-4 border border-gray-500 border-6">
        {/* Exit (X) Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold text-gray-700 hover:text-black"
          aria-label="Close"
        >
          ×
        </button>

        <label htmlFor="" className="font-bold text-3xl ">
          RESCHEDULE
        </label>

        {/* Calendar */}
        <Calendar />

        {/* Availability */}
        <div className="mt-10 sm:mt-20 w-full h-auto flex justify-center sm:justify-start">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="bg-[#989898] text-white font-semibold text-center py-2 rounded-t">
              September 26, 2025 Availability
            </div>
            {/* Slots */}
            <div>
              {slots.map((slot, index) => (
                <div
                  key={index}
                  className={`text-center py-2 text-sm ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  }`}
                >
                  {slot}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center sm:justify-end flex mt-10 sm:mt-10 w-full h-auto space-x-4">
          <button
            onClick={onClose}
            className=" w-full sm:w-30 sm:text-2xl sm:h-10 sm:rounded-full h-auto bg-[#FFFFFF] "
          >
            Cancel
          </button>

          <button className=" w-full sm:w-30 sm:text-2xl sm:h-10 sm:rounded-full w-20 h-auto bg-[#4C7FFF] text-white ">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reschedule;
