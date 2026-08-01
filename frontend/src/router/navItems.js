import {
  Wallet,
  LayoutDashboard,
  ArrowDownToLine,
  User,
  Bell,
  Zap,
  FileText,
  Landmark,
  Users,
  Inbox,
  Search,
  UserPlus,
  ShieldCheck,
} from "lucide-react";


export const userNavItems = [
  { to: "/user/open-account", label: "Open Account", icon: Wallet },
  { to: "/user/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/user/withdraw", label: "Withdraw", icon: ArrowDownToLine },
  { to: "/user/pay-bill", label: "Pay Bill", icon: Zap },
  { to: "/user/loan", label: "Loan", icon: Landmark },
  { to: "/user/statement", label: "Statement", icon: FileText },
  { to: "/user/notifications", label: "Notifications", icon: Bell, badge: false },
  { to: "/user/profile", label: "Profile", icon: User },
];

export const officerNavItems = [
  { to: "/officer/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/officer/accounts", label: "Accounts", icon: Users },
  { to: "/officer/account-requests", label: "Account Requests", icon: Inbox },
  { to: "/officer/loan-requests", label: "Loan Requests", icon: Landmark },
  { to: "/officer/statement-viewer", label: "Statement Viewer", icon: Search },
];

export const adminNavItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/add-officer", label: "Add Officer", icon: UserPlus },
  { to: "/admin/manage-officers", label: "Manage Officers", icon: ShieldCheck },
  { to: "/admin/manage-users", label: "Manage Users", icon: Users },
  { to: "/admin/manage-accounts", label: "Manage Accounts", icon: Wallet },
];
