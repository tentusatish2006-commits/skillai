import { useMemo, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from '@/lib/router';
import { useAuth } from '@/context/AuthContext';
import { ROLE_REQUIREMENTS } from '@/lib/skills';
import { AnimatedButton, FloatingBlobs, DraggableBlob, fadeUp, stagger } from '@/components/ui';
import { Mail, Lock, User as UserIcon, Briefcase, Check, AlertCircle, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';

export function SignupPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const pwStrength = useMemo(() => {
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  }, [password]);

  const strengthColors = ['bg-ink-700', 'bg-error', 'bg-amber-glow', 'bg-accent-500', 'bg-success'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];

  const canProceedStep0 = fullName.trim() && email.trim() && password.trim().length >= 6;
  const canProceedStep1 = !!targetRole;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await signUp(email, password, fullName, targetRole);
    setLoading(false);
    if (error) {
      setError(error);
    } else {
      setSuccess(true);
      setTimeout(() => navigate('dashboard'), 2200);
    }
  };

  if (success) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-950">
        <FloatingBlobs count={4} />
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-success/15 glow-success">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 12 }}
            >
              <Check className="h-12 w-12 text-success" strokeWidth={3} />
            </motion.div>
          </div>
          <h2 className="text-2xl font-bold text-ink-100">Account created!</h2>
          <p className="mt-2 text-ink-400">Taking you to your dashboard...</p>
          {/* confetti */}
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-sm"
              style={{
                background: ['#14d8c4', '#ffb547', '#34e3a0', '#ff5c7a'][i % 4],
                left: '50%',
                top: '30%',
              }}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: (Math.random() - 0.5) * 400,
                y: (Math.random() - 0.5) * 400,
                opacity: 0,
                rotate: Math.random() * 360,
              }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink-950 px-4 py-8">
      <FloatingBlobs count={3} />
      <DraggableBlob color="rgba(20,216,196,0.2)" size={130} className="top-[10%] right-[12%]" />
      <DraggableBlob color="rgba(255,181,71,0.14)" size={100} className="bottom-[16%] left-[8%]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-strong rounded-3xl p-8 shadow-2xl">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-500/15 glow-accent">
              <Sparkles className="h-7 w-7 text-accent-400" />
            </div>
            <h1 className="text-2xl font-bold text-ink-100">Create your account</h1>
            <p className="mt-1 text-sm text-ink-400">Step {step + 1} of 2 — let's get you job-ready</p>
          </div>

          {/* step indicator */}
          <div className="mb-6 flex items-center justify-center gap-3">
            {[0, 1].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <motion.div
                  className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
                  animate={{
                    backgroundColor: i <= step ? 'rgba(20,216,196,0.9)' : 'rgba(27,34,68,0.8)',
                    color: i <= step ? '#070912' : '#8794c2',
                    scale: i === step ? 1.15 : 1,
                  }}
                >
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </motion.div>
                {i === 0 && (
                  <motion.div
                    className="h-1 w-16 rounded-full bg-ink-700"
                  >
                    <motion.div
                      className="h-full rounded-full bg-accent-500"
                      initial={{ width: '0%' }}
                      animate={{ width: step > 0 ? '100%' : '0%' }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step0"
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, x: -30 }}
                  className="space-y-5"
                >
                  <motion.div variants={fadeUp}>
                    <label className="mb-1.5 block text-sm font-medium text-ink-300">Full Name</label>
                    <div className="relative">
                      <UserIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                      <input
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full rounded-xl border border-ink-600/40 bg-ink-900/60 py-2.5 pl-10 pr-3 text-ink-100 placeholder-ink-500 outline-none transition-all focus:border-accent-500/60 focus:ring-2 focus:ring-accent-500/20"
                        placeholder="Jane Doe"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <label className="mb-1.5 block text-sm font-medium text-ink-300">Email</label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-ink-600/40 bg-ink-900/60 py-2.5 pl-10 pr-3 text-ink-100 placeholder-ink-500 outline-none transition-all focus:border-accent-500/60 focus:ring-2 focus:ring-accent-500/20"
                        placeholder="you@example.com"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <label className="mb-1.5 block text-sm font-medium text-ink-300">Password</label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border border-ink-600/40 bg-ink-900/60 py-2.5 pl-10 pr-3 text-ink-100 placeholder-ink-500 outline-none transition-all focus:border-accent-500/60 focus:ring-2 focus:ring-accent-500/20"
                        placeholder="At least 6 characters"
                      />
                    </div>
                    {password && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-2"
                      >
                        <div className="flex gap-1.5">
                          {[0, 1, 2, 3].map((i) => (
                            <motion.div
                              key={i}
                              className="h-1.5 flex-1 rounded-full"
                              animate={{
                                backgroundColor: i < pwStrength
                                  ? strengthColors[pwStrength]
                                  : 'rgba(27,34,68,0.8)',
                              }}
                            />
                          ))}
                        </div>
                        <p className="mt-1 text-xs text-ink-400">
                          {strengthLabels[pwStrength] && `Strength: ${strengthLabels[pwStrength]}`}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.div variants={fadeUp} className="flex justify-end">
                    <AnimatedButton
                      type="button"
                      disabled={!canProceedStep0}
                      onClick={() => setStep(1)}
                      className="flex items-center gap-2"
                    >
                      Next <ChevronRight className="h-4 w-4" />
                    </AnimatedButton>
                  </motion.div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, x: 30 }}
                  className="space-y-5"
                >
                  <motion.div variants={fadeUp}>
                    <label className="mb-1.5 block text-sm font-medium text-ink-300">What's your target job role?</label>
                    <div className="relative">
                      <Briefcase className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                      <select
                        required
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-ink-600/40 bg-ink-900/60 py-2.5 pl-10 pr-3 text-ink-100 outline-none transition-all focus:border-accent-500/60 focus:ring-2 focus:ring-accent-500/20"
                      >
                        <option value="">Select a role...</option>
                        {ROLE_REQUIREMENTS.map((r) => (
                          <option key={r.role} value={r.role}>{r.role}</option>
                        ))}
                      </select>
                    </div>
                    {targetRole && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2 text-xs text-ink-400"
                      >
                        {ROLE_REQUIREMENTS.find((r) => r.role === targetRole)?.description}
                      </motion.p>
                    )}
                  </motion.div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 rounded-lg bg-error/10 px-3 py-2 text-sm text-error"
                    >
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {error}
                    </motion.div>
                  )}

                  <motion.div variants={fadeUp} className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(0)}
                      className="flex items-center gap-1 text-sm text-ink-400 hover:text-ink-200"
                    >
                      <ChevronLeft className="h-4 w-4" /> Back
                    </button>
                    <AnimatedButton type="submit" disabled={!canProceedStep1 || loading}>
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <motion.span
                            className="h-4 w-4 rounded-full border-2 border-ink-950/30 border-t-ink-950"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          />
                          Creating...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Create Account <Check className="h-4 w-4" />
                        </span>
                      )}
                    </AnimatedButton>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          <p className="mt-6 text-center text-sm text-ink-400">
            Already have an account?{' '}
            <button
              onClick={() => navigate('login')}
              className="group relative font-medium text-accent-400"
            >
              Sign in
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent-400 transition-all duration-300 group-hover:w-full" />
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
