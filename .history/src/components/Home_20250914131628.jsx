import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Navigation
          </h1>
          <ul className="flex flex-wrap gap-4">
            <NavItem to="/messages" label="Messages" />
            <NavItem to="/schedule" label="Schedule" />
            <NavItem to="/subscription" label="Subscription" />
            <NavItem to="/petownercard" label="Pet Owner Card" />
            <NavItem to="/petownerprofile" label="Owner Profile" />
            <NavItem to="/petowner_profile_edit" label="Edit Owner Profile" />
            <NavItem to="/petsprofile" label="Pets Profile" />
            <NavItem to="/petsprofileedit" label="Edit Pets Profile" />
            <NavItem to="/medicalhistory" label="Medical History" />
            <NavItem
              to="/upcoming_appointments"
              label="Upcoming Appointments"
            />
            <NavItem to="/reschedule" label="Reschedule" />
            <NavItem to="/settings_clinic" label="Clinic Settings" />
            <NavItem to="/settings_changepassword" label="Change Password" />
            <NavItem to="/settings_clinic_details" label="Clinic Details" />
            <NavItem to="/admin_petowners" label="Admin - Pet Owners" />
            <NavItem to="/admin_veterinaries" label="Admin - Veterinaries" />
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-6 text-center">
        <h2 className="text-3xl font-bold text-gray-700">
          Welcome to the Home Page
        </h2>
        <p className="mt-2 text-gray-600">
          Use the navigation bar above to visit different sections.
        </p>
      </div>
    </div>
  );
};

// Reusable NavItem component for cleaner code
const NavItem = ({ to, label }) => (
  <li>
    <Link
      to={to}
      className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      {label}
    </Link>
  </li>
);

export default Home;
