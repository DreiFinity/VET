import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-blue-600">
                PetCare
              </Link>
              <div className="hidden md:flex space-x-4 ml-10">
                <Link
                  to="/messages"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Messages
                </Link>
                <Link
                  to="/schedule"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Schedule
                </Link>
                <Link
                  to="/petownerprofile"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Owner Profile
                </Link>
                <Link
                  to="/petsprofile"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Pets Profile
                </Link>
                <Link
                  to="/medicalhistory"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Medical History
                </Link>
                <Link
                  to="/upcoming_appointments"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Upcoming Appointments
                </Link>
                <Link
                  to="/reschedule"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Reschedule
                </Link>
                <Link
                  to="/settings_clinic"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Settings
                </Link>
                <Link
                  to="/admin_petowners"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Admin Pet Owners
                </Link>
                <Link
                  to="/admin_veterinaries"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Admin Veterinaries
                </Link>
              </div>
            </div>
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              {/* You can add a hamburger menu here for mobile */}
            </div>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to PetCare
        </h1>
        <p className="text-gray-600">
          Use the navbar above to navigate to different pages.
        </p>
      </div>
    </div>
  );
}
