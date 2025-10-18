import React from "react";

export default function UpcomingAppointment() {
  return (
    <div
      className="
        bg-white shadow-lg w-full max-w-[1100px] mx-auto rounded-xl overflow-hidden border border-gray-300 p-4
        sm:p-6 lg:p-8
      "
      style={{
        fontFamily:
          '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, sans-serif',
      }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start mb-4">
        <img
          src="/Cat_Image.png"
          alt="Leo"
          className="w-16 h-16 rounded-full mb-3 sm:mb-0 sm:mr-4"
        />
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start mb-1">
            <span className="w-3 h-3 bg-green-500 rounded-full inline-block mr-2"></span>
            <span className="font-semibold text-lg">Confirmed</span>
          </div>
          <h2 className="text-2xl font-bold">Leo</h2>
          <p className="text-gray-500">Persian</p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t pt-4 pb-4 mb-4">
        <div>
          <p className="text-gray-500 text-sm">Service Type</p>
          <p>Routine Exam</p>
          <p className="mt-2 text-gray-500 text-sm">Veterinarian</p>
          <p>Dr. Jorge M. Martinez</p>
        </div>
        <div className="sm:text-right">
          <p className="text-gray-500 text-sm">Date</p>
          <p>September 26, 2025</p>
          <p className="mt-2 text-gray-500 text-sm">Time</p>
          <p>10:00 AM</p>
        </div>
      </div>

      {/* Clinic Info */}
      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold mb-1">Clinic Info</h3>
        <p className="text-gray-500 text-sm">Clinic Name</p>
        <p>Jo Capang Vetter</p>
        <p className="mt-2 text-gray-500 text-sm">Clinic Address</p>
        <p>Torres St., Davao City, Davao Del Sur</p>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
        <button className="py-2 px-4 bg-red-400 text-white rounded hover:bg-red-500 transition">
          Cancel Appointment
        </button>
        <button className="py-2 px-4 bg-blue-400 text-white rounded hover:bg-blue-500 transition">
          Reschedule
        </button>
      </div>
    </div>
  );
}
