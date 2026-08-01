import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from "../../components/layout/AppLayout";
import FormInput from "../../components/shared/FormInput";
import { userNavItems } from "../../router/navItems";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api/client";
import { Landmark, CheckCircle2, XCircle, Info } from "lucide-react";

export default function LoanRequestPage() {
  const { actor, account } = useAuth();
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    setLoading(true);
    try {
      await api.post("/loan-request", { accountNo: account?.account_no, amount: Number(amount) });
      setResult({ success: true, message: "Loan request submitted for review." });
      setAmount("");
    } catch (err) {
      setResult({ success: false, message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout navItems={userNavItems}>
      <div className="mx-auto max-w-lg px-5 py-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-400">
              <Landmark size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-ink dark:text-inkDark">Request a Loan</h1>
              <p className="text-sm text-ink-muted dark:text-inkDark-muted">Reviewed by an officer or admin</p>
            </div>
          </div>

          {/* Info banner */}
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-brand-blue/15 bg-brand-blue/5 px-4 py-4">
            <Info size={16} className="mt-0.5 text-brand-bluelight shrink-0" />
            <div>
              <p className="text-sm font-semibold text-ink dark:text-inkDark">How it works</p>
              <p className="text-xs text-ink-muted dark:text-inkDark-muted mt-0.5 leading-relaxed">
                Submit your request and an officer or admin will review it. Once approved, the amount is credited to your account automatically.
              </p>
            </div>
          </div>

          {!account && (
            <div className="mb-5 flex items-center gap-3 rounded-xl border border-amber-500/25 bg-amber-500/8 px-4 py-3.5">
              <XCircle size={16} className="text-amber-500 shrink-0" />
              <span className="text-sm text-amber-600 dark:text-amber-400">You need an active account to request a loan.</span>
            </div>
          )}

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mb-5 flex items-start gap-3 rounded-xl border px-4 py-3.5 ${
                  result.success
                    ? "border-successDark/25 bg-successDark/8 text-successDark"
                    : "border-dangerDark/25 bg-dangerDark/8 text-dangerDark"
                }`}
              >
                {result.success ? <CheckCircle2 size={16} className="mt-0.5 shrink-0" /> : <XCircle size={16} className="mt-0.5 shrink-0" />}
                <span className="text-sm font-medium">{result.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="rounded-card bg-white dark:bg-surfaceDark border border-black/5 dark:border-white/8 shadow-card dark:shadow-cardDark p-6 space-y-4">
            {account && (
              <div className="flex items-center justify-between rounded-xl bg-surface-sunk dark:bg-surfaceDark-sunk px-4 py-3">
                <span className="text-sm text-ink-muted dark:text-inkDark-muted">From account</span>
                <span className="font-mono text-sm font-semibold text-ink dark:text-inkDark">{account.account_no}</span>
              </div>
            )}
            <FormInput label="Loan amount" type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={!account || loading}
              className="w-full rounded-xl bg-gradient-brand py-3.5 text-sm font-bold text-white btn-glow disabled:opacity-50 transition-opacity"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Submitting…
                </span>
              ) : "Submit Loan Request"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </AppLayout>
  );
}
