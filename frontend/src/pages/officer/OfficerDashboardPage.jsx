import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Inbox, Landmark, CheckCircle2, Clock } from "lucide-react";
import AppLayout from "../../components/layout/AppLayout";
import StatCard from "../../components/shared/StatCard";
import { officerNavItems } from "../../router/navItems";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api/client";
import { useNavigate } from "react-router-dom";

export default function OfficerDashboardPage() {
  const { actor } = useAuth();
  const navigate = useNavigate();
  const [pendingAccounts, setPendingAccounts] = useState(0);
  const [pendingLoans, setPendingLoans] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/account-requests").then((d) => setPendingAccounts((d.requests || []).filter((r) => r.status === "PENDING").length)),
      api.get("/loan-requests").then((d) => setPendingLoans((d.requests || []).filter((l) => l.status === "PENDING").length)),
    ]).finally(() => setLoading(false));
  }, []);

  const actions = [
    { label: "Review account requests", badge: pendingAccounts, to: "/officer/account-requests", color: "from-amber-500 to-orange-400", icon: Inbox },
    { label: "Review loan requests", badge: pendingLoans, to: "/officer/loan-requests", color: "from-brand-blue to-blue-400", icon: Landmark },
    { label: "Manage accounts", badge: null, to: "/officer/accounts", color: "from-successDark to-teal-400", icon: CheckCircle2 },
  ];

  return (
    <AppLayout navItems={officerNavItems}>
      <div className="mx-auto max-w-3xl px-5 py-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-6">
          <div>
            <p className="text-sm text-ink-muted dark:text-inkDark-muted">Officer Portal</p>
            <h1 className="font-display text-2xl font-bold text-ink dark:text-inkDark">
              Welcome, <span className="gradient-text">{actor?.id}</span>
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <StatCard icon={Inbox} label="Pending account requests" value={loading ? "—" : pendingAccounts} accent="amber" />
            <StatCard icon={Landmark} label="Pending loan requests" value={loading ? "—" : pendingLoans} accent="amber" />
          </div>

          {/* Quick action cards */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-muted dark:text-inkDark-muted">Your Actions</p>
            <div className="space-y-3">
              {actions.map(({ label, badge, to, color, icon: Icon }) => (
                <motion.button
                  key={to}
                  whileHover={{ x: 4, transition: { type: "spring", stiffness: 400, damping: 20 } }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(to)}
                  className="w-full flex items-center justify-between rounded-2xl border border-black/5 dark:border-white/8 bg-white dark:bg-surfaceDark shadow-card dark:shadow-cardDark px-5 py-4 hover:border-brand-blue/20 hover:shadow-glowSm transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${color}`}>
                      <Icon size={18} className="text-white" />
                    </div>
                    <span className="font-semibold text-ink dark:text-inkDark">{label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {badge !== null && badge > 0 && (
                      <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-amber-500/15 px-2 text-xs font-bold text-amber-600 dark:text-amber-400">
                        {badge}
                      </span>
                    )}
                    {badge !== null && badge === 0 && (
                      <span className="flex items-center gap-1 text-xs font-medium text-successDark">
                        <CheckCircle2 size={12} /> All clear
                      </span>
                    )}
                    <svg className="h-4 w-4 text-ink-muted dark:text-inkDark-muted group-hover:text-ink dark:group-hover:text-inkDark transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
