import { Routes, Route, Navigate } from "react-router-dom";

// Auth
import LandingPage from "../pages/auth/LandingPage";
import RegisterRoleSelect from "../pages/auth/RegisterRoleSelect";
import RegisterFormPage from "../pages/auth/RegisterFormPage";
import LoginRoleSelect from "../pages/auth/LoginRoleSelect";
import LoginFormPage from "../pages/auth/LoginFormPage";

// User
import OpenAccountPage from "../pages/user/OpenAccountPage";
import DashboardPage from "../pages/user/DashboardPage";
import WithdrawPage from "../pages/user/WithdrawPage";
import PayBillPage from "../pages/user/PayBillPage";
import LoanRequestPage from "../pages/user/LoanRequestPage";
import MiniStatementPage from "../pages/user/MiniStatementPage";
import ProfilePage from "../pages/user/ProfilePage";
import NotificationsPage from "../pages/user/NotificationsPage";

// Officer
import OfficerDashboardPage from "../pages/officer/OfficerDashboardPage";
import OfficerAccountsPage from "../pages/officer/OfficerAccountsPage";
import OfficerAccountRequestsPage from "../pages/officer/OfficerAccountRequestsPage";
import OfficerLoanRequestsPage from "../pages/officer/OfficerLoanRequestsPage";
import OfficerStatementViewerPage from "../pages/officer/OfficerStatementViewerPage";

// Admin
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminAddOfficerPage from "../pages/admin/AdminAddOfficerPage";
import AdminManageOfficersPage from "../pages/admin/AdminManageOfficersPage";
import AdminManageUsersPage from "../pages/admin/AdminManageUsersPage";
import AdminManageAccountsPage from "../pages/admin/AdminManageAccountsPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth flow */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterRoleSelect />} />
      <Route path="/register/form" element={<RegisterFormPage />} />
      <Route path="/login" element={<LoginRoleSelect />} />
      <Route path="/login/form" element={<LoginFormPage />} />

      {/* User */}
      <Route path="/user/open-account" element={<OpenAccountPage />} />
      <Route path="/user/dashboard" element={<DashboardPage />} />
      <Route path="/user/withdraw" element={<WithdrawPage />} />
      <Route path="/user/pay-bill" element={<PayBillPage />} />
      <Route path="/user/loan" element={<LoanRequestPage />} />
      <Route path="/user/statement" element={<MiniStatementPage />} />
      <Route path="/user/profile" element={<ProfilePage />} />
      <Route path="/user/notifications" element={<NotificationsPage />} />

      {/* Officer */}
      <Route path="/officer/dashboard" element={<OfficerDashboardPage />} />
      <Route path="/officer/accounts" element={<OfficerAccountsPage />} />
      <Route path="/officer/account-requests" element={<OfficerAccountRequestsPage />} />
      <Route path="/officer/loan-requests" element={<OfficerLoanRequestsPage />} />
      <Route path="/officer/statement-viewer" element={<OfficerStatementViewerPage />} />

      {/* Admin */}
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="/admin/add-officer" element={<AdminAddOfficerPage />} />
      <Route path="/admin/manage-officers" element={<AdminManageOfficersPage />} />
      <Route path="/admin/manage-users" element={<AdminManageUsersPage />} />
      <Route path="/admin/manage-accounts" element={<AdminManageAccountsPage />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
