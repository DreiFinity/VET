import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "./components/Sidebar";

// Admin pages
import Admin_PetOwners from "./pages/Admin_PetOwners";
import Admin_Veterinaries from "./pages/Admin_Veterinaries";
import Admin_BannedUsers from "./pages/Admin_BannedUsers";
import Admin_BannedVet from "./pages/Admin_BannedVet";
import Admin_UserReports from "./pages/Admin_UserReports";
import Billing from "./pages/Admin_Billing";
import Admin_Announcements from "./pages/Admin_Announcements";
import AdminLoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

// Non-admin pages
import Home from "./components/Home";
import Messages from "./components/Messages";
import VetSchedule from "./components/Schedule";
import Subscription from "./components/Subscription";
import Dashboard from "./components/Dashboard";
import MedicalHistory from "./components/MedicalHistory";
import OwnerProfile from "./components/OwnerProfile";
import ProfileModal from "./components/PetOwnerProfileEdit";
import PetsProfile from "./components/PetsProfile";
import PetsProfileEdit from "./components/PetsProfileEdit";
import Reschedule from "./components/Reschedule";
import Settings_ChangePassword from "./pages/Password";
import Settings_ClincDetails_Pt1 from "./components/Settings_ClincDetails_Pt1";
import Settings_Clinic from "./components/Settings_ClinicDtls";
import UpcomingAppointment from "./components/UpcomingAppointment";
import Navbar from "./components/Navbar";
import Admin_FreelanceVets from "./pages/Admin_FreelanceVet";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Non-admin routes */}
        <Route path="/" element={<AdminLoginPage />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/schedule" element={<VetSchedule />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/medicalhistory" element={<MedicalHistory />} />
        <Route path="/petownerprofile" element={<OwnerProfile />} />
        <Route path="/petowner_profile_edit" element={<ProfileModal />} />
        <Route path="/petsprofile" element={<PetsProfile />} />
        <Route path="/petsprofileedit" element={<PetsProfileEdit />} />
        <Route path="/reschedule" element={<Reschedule />} />
        <Route path="/settings_clinic" element={<Settings_Clinic />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/settings_changepassword"
          element={<Settings_ChangePassword />}
        />
        <Route
          path="/settings_clinic_details"
          element={<Settings_ClincDetails_Pt1 />}
        />
        <Route
          path="/upcoming_appointments"
          element={<UpcomingAppointment />}
        />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Admin routes wrapped in AdminLayout */}
        <Route
          path="/admin_petowners"
          element={
            <AdminLayout>
              <Admin_PetOwners />
            </AdminLayout>
          }
        />

        <Route
          path="/admin_veterinaries"
          element={
            <AdminLayout>
              <Admin_Veterinaries />
            </AdminLayout>
          }
        />
        <Route
          path="/admin_freelance"
          element={
            <AdminLayout>
              <Admin_FreelanceVets />
            </AdminLayout>
          }
        />

        <Route
          path="/admin_bannedusers"
          element={
            <AdminLayout>
              <Admin_BannedUsers />
            </AdminLayout>
          }
        />

        <Route
          path="/admin_bannedvet"
          element={
            <AdminLayout>
              <Admin_BannedVet />
            </AdminLayout>
          }
        />
        <Route
          path="/admin_userreports"
          element={
            <AdminLayout>
              <Admin_UserReports />
            </AdminLayout>
          }
        />
        <Route
          path="/admin_billing"
          element={
            <AdminLayout>
              <Billing />
            </AdminLayout>
          }
        />
        <Route
          path="/admin_announcements"
          element={
            <AdminLayout>
              <Admin_Announcements />
            </AdminLayout>
          }
        />

        <Route
          path="/admin_changepassword"
          element={
            <AdminLayout>
              <Settings_ChangePassword />
            </AdminLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function AdminLayout({ children }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 h-screen w-screen bg-white overflow-x-hidden">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        className="fixed md:hidden bottom-4 right-4 z-50 bg-black text-white p-3 rounded-full shadow-lg"
      >
        {isMobileSidebarOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed w-full md:relative inset-y-0 left-0 transform ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-40 md:col-span-2`}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="md:col-span-10 flex flex-col overflow-auto pt-25 md:pt-25">
        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  );
}

export default App;
