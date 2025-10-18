import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Messages from "./components/Messages";
import VetSchedule from "./components/Schedule";
import Subscription from "./components/Subscription";
import PetOwnerCard from "./components/PetOwnerCard";
import ProfileModal from "./components/PetOwnerProfileEdit";
import OwnerProfile from "./components/OwnerProfile";
import PetsProfile from "./components/PetsProfile";
import PetsProfileEdit from "./components/PetsProfileEdit";
import MedicalHistory from "./components/MedicalHistory";
import UpcomingAppointment from "./components/UpcomingAppointment";
import Reschedule from "./components/Reschedule";
import Settings_Clinic from "./components/Settings_ClinicDtls";
import Settings_ChangePassword from "./components/Password";
import Settings_ClincDetails_Pt1 from "./components/Settings_ClincDetails_Pt1";
import Admin_PetOwners from "./components/Admin_PetOwners";
import Admin_Veterinaries from "./components/Admin_Veterinaries";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/schedule" element={<VetSchedule />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/petownercard" element={<PetOwnerCard />} />
        <Route path="/petownerprofile" element={<OwnerProfile />} />
        <Route path="/petowner_profile_edit" element={<ProfileModal />} />
        <Route path="/petsprofile" element={<PetsProfile />} />
        <Route path="/petsprofileedit" element={<PetsProfileEdit />} />
        <Route path="/medicalhistory" element={<MedicalHistory />} />
        <Route
          path="/upcoming_appointments"
          element={<UpcomingAppointment />}
        ></Route>
        <Route path="/reschedule" element={<Reschedule />} />
        <Route path="/settings_clinic" element={<Settings_Clinic />} />
        <Route
          path="/settings_changepassword"
          element={<Settings_ChangePassword />}
        />
        <Route
          path="/settings_clinic_details"
          element={<Settings_ClincDetails_Pt1 />}
        />
        <Route path="/admin_petowners" element={<Admin_PetOwners />} />
        <Route path="/admin_veterinaries" element={<Admin_Veterinaries />} />

        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
