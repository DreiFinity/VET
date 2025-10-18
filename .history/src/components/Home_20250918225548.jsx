import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfileModal from "./PetOwnerProfileEdit";
import PetsProfileEdit from "./PetsProfileEdit";
import UpcomingAppointment from "./UpcomingAppointment";
import Reschedule from "./Reschedule";

export default function Home() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPetsProfileModal, setShowPetsProfileModal] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <nav style={{ padding: "1rem", background: "#eee" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>
          Home
        </Link>
        <Link to="/messages" style={{ marginRight: "1rem" }}>
          Messages
        </Link>
        <Link to="/schedule" style={{ marginRight: "1rem" }}>
          Schedule
        </Link>
        <Link to="/subscription" style={{ marginRight: "1rem" }}>
          Subscription
        </Link>
        <Link to="/petownerprofile" style={{ marginRight: "1rem" }}>
          {" "}
          PetOwnerProfile
        </Link>
        <Link to="/petsprofile" style={{ marginRight: "1rem" }}>
          {" "}
          Pets Profile
        </Link>
        <Link to="/medicalhistory" style={{ marginRight: "1rem" }}>
          {" "}
          Medical History
        </Link>
        <Link to="/upcoming_appointments" className="mr-5">
          Upcoming Appointments{" "}
        </Link>
        <Link to="/settings_clinic" className="mr-5">
          Settings_ClinicDetails{" "}
        </Link>
        <Link to="/settings_clinic_details" className="mr-5">
          Settings_Clinic Details Part 1
        </Link>
        <Link to="/settings_changepassword" className="mr-5">
          Settings ChangePassword
        </Link>
        <Link to="/admin_petowners" className="ml-5">
          Admin_PetOwners
        </Link>
        <Link to="/admin_veterinaries" className="ml-5">
          Admin_Veterinaries
        </Link>
        <Link to="/admin_bannedusers" className="ml-5">
          Admin_BannedUsers
        </Link>
        <Link to="/admin_bannedvet" className="ml-5">
          Admin_BannedVet
        </Link>
        <Link to="/admin_userreports" className="ml-5">
          Admin_UserReports
        </Link>
        <Link to="/admin_billing" className="ml-5">
          Admin_Billing
        </Link>
        <Link to="/admin_announcements" className="ml-5">
          Admin_Announcements
        </Link>

        {/* Change Profile link to a button that opens the modal */}

        <button
          style={{
            marginLeft: "1rem",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            border: "none",
            background: "#1976d2",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={() => setShowProfileModal(true)}
        >
          Profile Edit
        </button>

        <button
          style={{
            marginLeft: "1rem",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            border: "none",
            background: "#1976d2",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={() => setShowPetsProfileModal(true)}
        >
          Pets Profile Edit
        </button>
        <button
          style={{
            marginLeft: "1rem",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            border: "none",
            background: "#1976d2",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={() => setShowReschedule(true)}
        >
          Reschedule
        </button>
      </nav>
      <h1>Home</h1>
      <p>Welcome to the Home page!</p>
      {/* Show the modal when triggered */}
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
