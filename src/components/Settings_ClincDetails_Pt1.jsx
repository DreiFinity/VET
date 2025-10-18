import React from "react";

const Settings_ClincDetails_Pt1 = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-2 sm:px-4 py-6 sm:py-10 font-roboto">
      <div className="bg-white p-4 sm:p-6 md:p-8 w-full max-w-4xl mx-auto space-y-6 rounded-lg shadow">
        {/* Clinic Info */}
        <div className="divide-y">
          <div className="flex flex-col sm:flex-row sm:justify-between p-3">
            <span className="font-semibold mb-1 sm:mb-0">Clinic Name:</span>
            <span className="text-gray-700 break-words">Jo Capang Vetter</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between p-3">
            <span className="font-semibold mb-1 sm:mb-0">Contact Email:</span>
            <span className="text-gray-700 break-words">
              Jo_Capang_Vetter@gmail.com
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between p-3">
            <span className="font-semibold mb-1 sm:mb-0">Address:</span>
            <span className="text-gray-700 break-words text-sm sm:text-base sm:text-right">
              Torres St., Davao City, Davao Del Sur
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between p-3">
            <span className="font-semibold mb-1 sm:mb-0">Phone Number:</span>
            <span className="text-gray-700">09123456789</span>
          </div>
        </div>

        {/* Logo */}
        <div className="border-t border-b p-3 flex flex-col sm:flex-row sm:items-center">
          <span className="font-semibold mb-2 sm:mb-0 sm:mr-4">Logo:</span>
          <img
            src="./Cat_Image.png"
            alt="Clinic Logo"
            className="h-28 sm:h-32 w-auto object-contain"
          />
        </div>

        {/* Button */}
        <div className="flex justify-center sm:justify-start py-4">
          <button className="px-10 flex-1 sm:flex-none sm:px-12 py-2 bg-white border rounded-full shadow hover:bg-gray-100 transition">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings_ClincDetails_Pt1;
