import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from '@/lib/router';
import { useAuth } from '@/context/AuthContext';
import { AnimatedButton, FloatingBlobs, DraggableBlob, fadeUp, stagger } from '@/components/ui';
import { Mail, Lock, LogIn, AlertCircle, Sparkles } from 'lucide-react';

export function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError('Invalid email or password. Please try again.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } else {
      navigate('dashboard');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink-950 px-4">
      <FloatingBlobs count={3} />
      <DraggableBlob color="rgba(20,216,196,0.22)" size={140} className="top-[12%] left-[8%]" />
      <DraggableBlob color="rgba(255,181,71,0.16)" size={110} className="bottom-[14%] right-[10%]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-strong rounded-3xl p-8 shadow-2xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-500/15 glow-accent">
              <Sparkles className="h-7 w-7 text-accent-400" />
            </div>
            <h1 className="text-2xl font-bold text-ink-100">Welcome back</h1>
            <p className="mt-1 text-sm text-ink-400">Sign in to continue your upskilling journey</p>
          </motion.div>

          <motion.form
            variants={stagger}
            initial="hidden"
            animate="show"
            onSubmit={handleSubmit}
            className="space-y-5"
          >
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
                  placeholder="••••••••"
                />
              </div>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: 0 }}
                animate={shake ? { x: [-10, 10, -10, 10, 0] } : { x: 0 }}
                className="flex items-center gap-2 rounded-lg bg-error/10 px-3 py-2 text-sm text-error"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </motion.div>
            )}

            <motion.div variants={fadeUp}>
              <AnimatedButton type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      className="h-4 w-4 rounded-full border-2 border-ink-950/30 border-t-ink-950"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </span>
                )}
              </AnimatedButton>
            </motion.div>
          </motion.form>

          <p className="mt-6 text-center text-sm text-ink-400">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('signup')}
              className="group relative font-medium text-accent-400"
            >
              Sign up instead
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent-400 transition-all duration-300 group-hover:w-full" />
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
