import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfileModal from "./PetOwnerProfileEdit";
import PetsProfileEdit from "./PetsProfileEdit";
import Reschedule from "./Reschedule";

export default function Home() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPetsProfileModal, setShowPetsProfileModal] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Messages", path: "/messages" },
    { name: "Schedule", path: "/schedule" },
    { name: "Subscription", path: "/subscription" },
    { name: "PetOwnerProfile", path: "/petownerprofile" },
    { name: "Pets Profile", path: "/petsprofile" },
    { name: "Medical History", path: "/medicalhistory" },
    { name: "Upcoming Appointments", path: "/upcoming_appointments" },
    { name: "Settings Clinic Details", path: "/settings_clinic" },
    { name: "Settings Clinic Part1", path: "/settings_clinic_details" },
    { name: "Change Password", path: "/settings_changepassword" },
    { name: "Admin PetOwners", path: "/admin_petowners" },
    { name: "Admin Veterinaries", path: "/admin_veterinaries" },
    { name: "Admin BannedUsers", path: "/admin_bannedusers" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="p-4 bg-gray-200 flex flex-wrap items-center gap-2">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="px-3 py-1 rounded hover:bg-gray-300 bg-white"
          >
            {link.name}
          </Link>
        ))}

        {/* Modal Buttons */}
        <button
          className="px-3 py-1 ml-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => setShowProfileModal(true)}
        >
          Profile Edit
        </button>
        <button
          className="px-3 py-1 ml-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => setShowPetsProfileModal(true)}
        >
          Pets Profile Edit
        </button>
        <button
          className="px-3 py-1 ml-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => setShowReschedule(true)}
        >
          Reschedule
        </button>
      </nav>

      {/* Page Content */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Home</h1>
        <p>Welcome to the Home page!</p>
      </div>

      {/* Modals */}
      {showProfileModal && (
        <ProfileModal
          isOpen={showProfileModal}
          setIsOpen={setShowProfileModal}
        />
      )}
      {showPetsProfileModal && (
        <PetsProfileEdit
          isOpen={showPetsProfileModal}
          setIsOpen={setShowPetsProfileModal}
        />
      )}
      {showReschedule && (
        <Reschedule isOpen={showReschedule} setIsOpen={setShowReschedule} />
      )}
    </div>
  );
}
